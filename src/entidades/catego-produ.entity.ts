import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Productos } from '../entidades/productos.entity'; 

@Entity()
export class CategoriasProd {
  @PrimaryGeneratedColumn('uuid')
  id_categ: string;

  @Column({ length: 255 })
  //@Index() // Agregar un índice para mejorar las búsquedas por el nombre de la categoría
  categoria: string;

  @Column({ length: 255, default: 'vacio' })
  descripcion: string;
  
  @ManyToMany(() => Productos, productos => productos.id_cate, { lazy: true }) // Lazy Loading para la relación
  id_produ?: Promise<Productos[]>;
 
}
