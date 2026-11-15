import { Injectable } from '@nestjs/common';
import type { Product } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { FakeStoreProductDto } from './dto/fake-store-product.dto.js';
import type { ProductRequestDto } from './dto/product-request.dto.js';
import type { ProductResponseDto } from './dto/product-response.dto.js';
import { ProductNotFoundException } from './products.exceptions.js';

const FAKE_STORE_PRODUCTS_URL = 'https://fakestoreapi.com/products';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    return products.map((product) => this.toResponse(product));
  }

  public async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return this.toResponse(product);
  }

  public async create({
    title,
    price,
    category,
    description,
    image,
  }: ProductRequestDto): Promise<ProductResponseDto> {
    const product = await this.prisma.product.create({
      data: { title, price, category, description, image },
    });
    return this.toResponse(product);
  }

  public async update(
    id: number,
    { title, price, category, description, image }: ProductRequestDto,
  ): Promise<void> {
    const { count } = await this.prisma.product.updateMany({
      where: { id },
      data: {
        title,
        price,
        category,
        description,
        image,
        modificationDate: new Date(),
      },
    });
    if (!count) {
      throw new ProductNotFoundException(id);
    }
  }

  public async importFromFakeStore(): Promise<ProductResponseDto[]> {
    const response = await fetch(FAKE_STORE_PRODUCTS_URL);
    const fakeProducts = (await response.json()) as FakeStoreProductDto[];

    const existingTitles = new Set(
      (await this.prisma.product.findMany({ select: { title: true } })).map(
        ({ title }) => title,
      ),
    );
    const products = await this.prisma.product.createManyAndReturn({
      data: fakeProducts
        .filter(({ title }) => !existingTitles.has(title))
        .map(({ title, price, category, description, image }) => ({
          title,
          price,
          category,
          description,
          image,
        })),
    });

    return products.map((product) => this.toResponse(product));
  }

  private toResponse({
    id,
    title,
    price,
    category,
    description,
    image,
  }: Product): ProductResponseDto {
    return { id, title, price: price.toNumber(), category, description, image };
  }
}
