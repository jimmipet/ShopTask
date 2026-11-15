import { Entity, OneToMany, type Relation } from 'typeorm';
import { UuidEntity } from '../../common/base.entities.js';
import type { Product } from '../../products/entities/product.entity.js';
import { CartItemNotFoundException } from '../cart.exceptions.js';
import { CartItem } from './cart-item.entity.js';

@Entity('carts')
export class Cart extends UuidEntity {
  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: Relation<CartItem[]>;

  public get totalQuantity(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  public get totalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  public static create(): Cart {
    const cart = new Cart();
    cart.items = [];
    return cart;
  }

  public setQuantity(product: Product, quantity: number): void {
    const item = this.items.find(({ productId }) => productId === product.id);
    if (item) {
      item.changeQuantity(quantity);
    } else {
      this.items.push(CartItem.create(product, quantity));
    }
    this.modificationDate = new Date();
  }

  public removeProduct(productId: number): void {
    const index = this.items.findIndex((item) => item.productId === productId);
    if (index < 0) {
      throw new CartItemNotFoundException(productId);
    }
    this.items.splice(index, 1);
    this.modificationDate = new Date();
  }
}
