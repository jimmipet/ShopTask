import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { CartItemQuantityOutOfRangeException } from '../cart.exceptions.js';
import { Cart } from './cart.entity.js';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ name: 'cart_id', type: 'uuid' })
  cartId: string;

  @PrimaryColumn({ name: 'product_id', type: 'integer' })
  @Index()
  productId: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Relation<Cart>;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  public get lineTotal(): number {
    return this.product.price * this.quantity;
  }

  public static create(product: Product, quantity: number): CartItem {
    const item = new CartItem();
    item.product = product;
    item.productId = product.id;
    item.changeQuantity(quantity);
    return item;
  }

  public changeQuantity(quantity: number): void {
    if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
      throw new CartItemQuantityOutOfRangeException(MIN_QUANTITY, MAX_QUANTITY);
    }
    this.quantity = quantity;
  }
}
