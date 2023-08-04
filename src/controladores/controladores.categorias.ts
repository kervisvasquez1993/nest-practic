import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoriasServicio } from '../servicios/servicios.categorias';
import { CategoriasProd } from '../entidades/catego-produ.entity';

@Controller('categorias')
export class CategoriesController {
  constructor(private readonly categoriasServicio: CategoriasServicio) {}

  @Get()
  async getAllCategories(): Promise<CategoriasProd[]> {
    return this.categoriasServicio.getAllCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<CategoriasProd> {
    return this.categoriasServicio.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() category: CategoriasProd): Promise<CategoriasProd> {
    return this.categoriasServicio.createCategory(category);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() categoria: CategoriasProd): Promise<CategoriasProd> {
    return this.categoriasServicio.updateCategory(id,categoria)
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoriasServicio.deleteCategory(id);
  }
}
