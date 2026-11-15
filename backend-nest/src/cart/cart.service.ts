import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductNotFoundException } from '../products/products.exceptions.js';
import {
  CartItemNotFoundException,
  CartItemQuantityInvalidException,
} from './cart.exceptions.js';
import type { CartResponseDto } from './dto/cart-response.dto.js';

const CART_INCLUDE = {
  items: { include: { product: true }, orderBy: { productId: 'asc' } },
} satisfies Prisma.CartInclude;

type CartWithItems = Prisma.CartGetPayload<{ include: typeof CART_INCLUDE }>;

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  public async get(cartId: string | undefined): Promise<CartResponseDto> {
    const cart = cartId
      ? await this.prisma.cart.findUnique({
          where: { id: cartId },
          include: CART_INCLUDE,
        })
      : null;
    return this.toResponse(cart);
  }

  public async setQuantity(
    cartId: string | undefined,
    productId: number,
    quantity: number,
  ): Promise<{ cartId: string; cart: CartResponseDto }> {
    if (quantity < 1) {
      throw new CartItemQuantityInvalidException();
    }

    const cart = await this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });
      if (!product) {
        throw new ProductNotFoundException(productId);
      }

      const existing = cartId
        ? await tx.cart.findUnique({
            where: { id: cartId },
            select: { id: true },
          })
        : null;

      return existing
        ? tx.cart.update({
            where: { id: existing.id },
            data: {
              modificationDate: new Date(),
              items: {
                upsert: {
                  where: {
                    cartId_productId: { cartId: existing.id, productId },
                  },
                  create: { productId, quantity },
                  update: { quantity },
                },
              },
            },
            include: CART_INCLUDE,
          })
        : tx.cart.create({
            data: { items: { create: { productId, quantity } } },
            include: CART_INCLUDE,
          });
    });

    return { cartId: cart.id, cart: this.toResponse(cart) };
  }

  public async remove(
    cartId: string | undefined,
    productId: number,
  ): Promise<CartResponseDto> {
    if (!cartId) {
      throw new CartItemNotFoundException(productId);
    }

    const cart = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.cartItem.deleteMany({
        where: { cartId, productId },
      });
      if (!count) {
        throw new CartItemNotFoundException(productId);
      }
      return tx.cart.update({
        where: { id: cartId },
        data: { modificationDate: new Date() },
        include: CART_INCLUDE,
      });
    });

    return this.toResponse(cart);
  }

  private toResponse(cart: CartWithItems | null): CartResponseDto {
    const items = cart?.items ?? [];
    return {
      items: items.map(({ productId, quantity, product }) => ({
        productId,
        title: product.title,
        description: product.description,
        image: product.image,
        unitPrice: product.price.toNumber(),
        quantity,
        lineTotal: product.price.mul(quantity).toNumber(),
      })),
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items
        .reduce(
          (sum, { product, quantity }) => sum.add(product.price.mul(quantity)),
          new Prisma.Decimal(0),
        )
        .toNumber(),
    };
  }
}
