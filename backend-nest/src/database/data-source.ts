import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CartItem } from '../cart/entities/cart-item.entity.js';
import { Cart } from '../cart/entities/cart.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { POSTGRES_OPTIONS } from './postgres.options.js';

process.loadEnvFile();

export default new DataSource({
  ...POSTGRES_OPTIONS,
  url: process.env.DATABASE_URL,
  entities: [Product, Cart, CartItem],
  migrations: [`${import.meta.dirname}/migrations/*.js`],
});
