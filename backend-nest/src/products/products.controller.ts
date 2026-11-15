import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRequestDto } from './dto/product-request.dto.js';
import type { ProductResponseDto } from './dto/product-response.dto.js';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public findAll(): Promise<ProductResponseDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }

  @Post()
  public create(@Body() dto: ProductRequestDto): Promise<ProductResponseDto> {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductRequestDto,
  ): Promise<void> {
    return this.productsService.update(id, dto);
  }

  @Post('import')
  @HttpCode(HttpStatus.OK)
  public importFromFakeStore(): Promise<ProductResponseDto[]> {
    return this.productsService.importFromFakeStore();
  }
}
