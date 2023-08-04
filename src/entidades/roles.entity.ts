//entidad roles
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuarios } from './usuario.entity';
import { Permisos } from './permisos.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ length: 255 })
  nombre_rol: string;

  @Column({ length: 255 })
  descripcion_rol: string;
 
  @ManyToMany(() => Usuarios, usuarios => usuarios.roles)
  usuarios: Usuarios[];

  @ManyToMany(() => Permisos)
  @JoinTable({
    name: 'roles_permisos',
    joinColumn: { name: 'id_rol', referencedColumnName: 'id_rol' },
    inverseJoinColumn: { name: 'id_permiso', referencedColumnName: 'id_permiso' },
  })
  permisos: Permisos[];
}
