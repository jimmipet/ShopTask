import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { FakeStoreProductDto } from './dto/fake-store-product.dto.js';
import type { ProductRequestDto } from './dto/product-request.dto.js';
import type { ProductResponseDto } from './dto/product-response.dto.js';
import { Product } from './entities/product.entity.js';
import { ProductNotFoundException } from './products.exceptions.js';

const FAKE_STORE_PRODUCTS_URL = 'https://fakestoreapi.com/products';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly products: Repository<Product>,
  ) {}

  public async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.products.find({ order: { id: 'ASC' } });
    return products.map((product) => this.toResponse(product));
  }

  public async findOne(id: number): Promise<ProductResponseDto> {
    return this.toResponse(await this.findProduct(id));
  }

  public async create(dto: ProductRequestDto): Promise<ProductResponseDto> {
    const product = Product.create(
      dto.title,
      dto.price,
      dto.category,
      dto.description,
      dto.image,
    );
    return this.toResponse(await this.products.save(product));
  }

  public async update(id: number, dto: ProductRequestDto): Promise<void> {
    const product = await this.findProduct(id);
    product.update(
      dto.title,
      dto.price,
      dto.category,
      dto.description,
      dto.image,
    );
    await this.products.save(product);
  }

  public async importFromFakeStore(): Promise<ProductResponseDto[]> {
    const response = await fetch(FAKE_STORE_PRODUCTS_URL);
    const fakeProducts = (await response.json()) as FakeStoreProductDto[];

    const existingTitles = new Set(
      (await this.products.find({ select: { title: true } })).map(
        ({ title }) => title,
      ),
    );
    const newProducts = fakeProducts
      .filter(({ title }) => !existingTitles.has(title))
      .map((fake) =>
        Product.create(
          fake.title,
          fake.price,
          fake.category,
          fake.description,
          fake.image,
        ),
      );

    const saved = await this.products.save(newProducts);
    return saved.map((product) => this.toResponse(product));
  }

  private async findProduct(id: number): Promise<Product> {
    const product = await this.products.findOneBy({ id });
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  private toResponse({
    id,
    title,
    price,
    category,
    description,
    image,
  }: Product): ProductResponseDto {
    return { id, title, price, category, description, image };
  }
}
