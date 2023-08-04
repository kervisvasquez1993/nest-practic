import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuarios } from './usuario.entity';
import { Roles } from './roles.entity';

@Entity()
export class Permisos {
  @PrimaryGeneratedColumn()
  id_permiso: number;

  @Column({ length: 255 })
  nombre_permiso: string;

  @Column({ length: 255 })
  descripcion_permiso: string;

  @ManyToMany(() => Usuarios, usuarios => usuarios.permisos)
  usuarios: Usuarios[];

  @ManyToMany(() => Roles, roles => roles.permisos)
  @JoinTable({
    name: 'Roles_Permisos',
    joinColumn: { name: 'id_permiso', referencedColumnName: 'id_permiso' },
    inverseJoinColumn: { name: 'id_rol', referencedColumnName: 'id_rol' },
  })
  roles: Roles[];
}
