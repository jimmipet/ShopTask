import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Cookie } from '../common/cookie.decorator.js';
import { CartService } from './cart.service.js';
import type { CartResponseDto } from './dto/cart-response.dto.js';
import { SetQuantityDto } from './dto/set-quantity.dto.js';

const CART_COOKIE = 'shoptask_cart';
const CART_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const cartIdPipe = new ParseUUIDPipe({ optional: true });

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  public get(
    @Cookie(CART_COOKIE, cartIdPipe) cartId?: string,
  ): Promise<CartResponseDto> {
    return this.cartService.get(cartId);
  }

  @Put('items/:productId')
  public async setQuantity(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() { quantity }: SetQuantityDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Cookie(CART_COOKIE, cartIdPipe) cartId?: string,
  ): Promise<CartResponseDto> {
    const result = await this.cartService.setQuantity(
      cartId,
      productId,
      quantity,
    );
    response.cookie(CART_COOKIE, result.cartId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: request.secure,
      maxAge: CART_COOKIE_MAX_AGE_MS,
    });
    return result.cart;
  }

  @Delete('items/:productId')
  public remove(
    @Param('productId', ParseIntPipe) productId: number,
    @Cookie(CART_COOKIE, cartIdPipe) cartId?: string,
  ): Promise<CartResponseDto> {
    return this.cartService.remove(cartId, productId);
  }
}
