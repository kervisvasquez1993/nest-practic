import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CategoriasProd } from '../entidades/catego-produ.entity'; 

@Entity()
export class Productos {
  @PrimaryGeneratedColumn('uuid')
  id_produ: string;

  @Column({ length: 255, default: 'No agregado' })
  //@Index() // Agregar un índice para mejorar las búsquedas por el nombre del producto
  producto: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ length: 255, default: 'No agregado' })
  descripcion: string;

  @ManyToMany(() => CategoriasProd, { lazy: true }) // Lazy Loading para la relación
  @JoinTable()
  id_cate?: Promise<CategoriasProd[]>;

  
}


