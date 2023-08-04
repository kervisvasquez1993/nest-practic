import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos} from '../entidades/productos.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Productos)
    private productsRepository: Repository<Productos>,
  ) {}

  async getAllProducts(): Promise<Productos[]> {
    return this.productsRepository.find();
  }

  async getProductById(id: string): Promise<Productos> {
    return this.productsRepository.findOneById(id);
  }

  async createProduct(product: Productos): Promise<Productos> {
    return this.productsRepository.save(product);
  }

  async updateProduct(id: string, productos: Productos): Promise<Productos> {
    await this.productsRepository.update(id, productos);
    return this.getProductById(id);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
