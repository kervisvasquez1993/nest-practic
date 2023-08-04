// dentro de la carpeta entidades /usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Roles } from './roles.entity';
import { Permisos } from './permisos.entity';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;
  
  @Column({ length: 35 })
  apellido: string;

  @Column({ length: 255 })
  correo: string;

  @Column({ length: 255 })
  contraseña: string;

  @Column({ length: 15,default: 'desactivado'})
  estado: string;
  
  @ManyToMany(() => Roles)
  @JoinTable({
    name: 'usuarios_roles',
    joinColumn: { name: 'id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_rol', referencedColumnName: 'id_rol' },
  })
  roles: Roles[];

  @ManyToMany(() => Permisos)
  @JoinTable({
    name: 'usuarios_permisos',
    joinColumn: { name: 'id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_permiso', referencedColumnName: 'id_permiso' },
  })
  permisos: Permisos[];
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Hashear la contraseña antes de insertar o actualizar el usuario
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }

  async comparePassword(contraseña: string): Promise<boolean> {
    // Comparar la contraseña proporcionada con la contraseña almacenada
    return await bcrypt.compare(contraseña, this.contraseña);
  }

  toJSON() {
    // Eliminar la contraseña en la respuesta JSON del usuario
    const { contraseña, ...user } = this;
    return user;
  }
  async toJSON_autorizaUsuario(contraseña: string): Promise<UsuarioAutorizado | null> {
    // Agregar el "await" para esperar la promesa de comparePassword()
    if (await this.comparePassword(contraseña)) {
      return {
        nombre: this.nombre,
        apellido: this.apellido,
        contraseña: this.contraseña,
      };
    }
    return null;
  }
  
}

