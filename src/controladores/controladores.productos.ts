import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from '../servicios/servicios.productos';
import { Productos } from '../entidades/productos.entity';
import { dtoCrearProducto } from 'src/dtos/dtos.crear-producto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Productos[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Productos> {
    return this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() producto: dtoCrearProducto): Promise<Productos> {
    return this.productsService.createProduct(producto);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() producto: Productos): Promise<Productos> {
    return this.productsService.updateProduct(id, producto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
