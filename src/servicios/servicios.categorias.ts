import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasProd } from '../entidades/catego-produ.entity';

@Injectable()
export class CategoriasServicio {
  constructor(
    @InjectRepository(CategoriasProd)
    private categoriasRepositorio: Repository<CategoriasProd>,
  ) {}

  async getAllCategories(): Promise<CategoriasProd[]> {
    return this.categoriasRepositorio.find();
  }

  async getCategoryById(id: string): Promise<CategoriasProd> {
    return this.categoriasRepositorio.findOneById(id );
  }

  async createCategory(category: CategoriasProd): Promise<CategoriasProd> {
    return this.categoriasRepositorio.save(category);
  }

  async updateCategory(id: string, categoria: CategoriasProd): Promise<CategoriasProd> {
    await this.categoriasRepositorio.update(id, categoria);
    return this.getCategoryById(id);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoriasRepositorio.delete(id);
  }
}
