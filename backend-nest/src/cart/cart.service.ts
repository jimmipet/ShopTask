import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';
import { ProductNotFoundException } from '../products/products.exceptions.js';
import { CartItemNotFoundException } from './cart.exceptions.js';
import type { CartResponseDto } from './dto/cart-response.dto.js';
import { Cart } from './entities/cart.entity.js';

const roundMoney = (value: number): number => Math.round(value * 100) / 100;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly carts: Repository<Cart>,
    @InjectRepository(Product) private readonly products: Repository<Product>,
  ) {}

  public async get(cartId: string | undefined): Promise<CartResponseDto> {
    return this.toResponse(await this.findCart(cartId));
  }

  public async setQuantity(
    cartId: string | undefined,
    productId: number,
    quantity: number,
  ): Promise<{ cartId: string; cart: CartResponseDto }> {
    const product = await this.products.findOneBy({ id: productId });
    if (!product) {
      throw new ProductNotFoundException(productId);
    }

    const cart = (await this.findCart(cartId)) ?? Cart.create();
    cart.setQuantity(product, quantity);
    await this.carts.save(cart);

    return { cartId: cart.id, cart: this.toResponse(cart) };
  }

  public async remove(
    cartId: string | undefined,
    productId: number,
  ): Promise<CartResponseDto> {
    const cart = await this.findCart(cartId);
    if (!cart) {
      throw new CartItemNotFoundException(productId);
    }

    cart.removeProduct(productId);
    await this.carts.save(cart);

    return this.toResponse(cart);
  }

  private findCart(cartId: string | undefined): Promise<Cart | null> {
    return cartId
      ? this.carts.findOne({
          where: { id: cartId },
          relations: { items: { product: true } },
        })
      : Promise.resolve(null);
  }

  private toResponse(cart: Cart | null): CartResponseDto {
    if (!cart) {
      return { items: [], totalQuantity: 0, totalPrice: 0 };
    }

    return {
      items: cart.items
        .toSorted((a, b) => a.productId - b.productId)
        .map((item) => ({
          productId: item.productId,
          title: item.product.title,
          description: item.product.description,
          image: item.product.image,
          unitPrice: item.product.price,
          quantity: item.quantity,
          lineTotal: roundMoney(item.lineTotal),
        })),
      totalQuantity: cart.totalQuantity,
      totalPrice: roundMoney(cart.totalPrice),
    };
  }
}
