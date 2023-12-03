import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductRequestDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAll() {
    return this.productService.getMany({});
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getOne({ id });
  }

  @Post()
  async createProduct(productData: CreateProductRequestDto) {
    return this.productService.createWithConnection(productData);
  }
}
