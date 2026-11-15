import { Column, Entity } from 'typeorm';
import { IdentityEntity } from '../../common/base.entities.js';

@Entity('products')
export class Product extends IdentityEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({
    type: 'numeric',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price: number;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  image: string | null;

  public static create(
    title: string,
    price: number,
    category: string,
    description: string,
    image: string | null,
  ): Product {
    const product = new Product();
    product.update(title, price, category, description, image);
    return product;
  }

  public update(
    title: string,
    price: number,
    category: string,
    description: string,
    image: string | null,
  ): void {
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
    this.modificationDate = new Date();
  }
}
