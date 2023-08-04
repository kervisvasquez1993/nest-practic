import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
//import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Usuarios } from '../entidades/usuario.entity';
import { CreateUserDto } from '../dtos/dtos.crear-usuario.dto';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) { }

 //@Transactional()
  async createUser(createUserDto: CreateUserDto): Promise<Usuarios> {
    const existingUser = await this.entityManager.findOne(Usuarios, 
      { where: { nombre: createUserDto.nombre, apellido :createUserDto.apellido } });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    const usuario = new Usuarios();
    usuario.nombre = createUserDto.nombre;
    usuario.apellido = createUserDto.apellido;
    usuario.correo = createUserDto.correo;
    usuario.contraseña = createUserDto.contraseña ;
    usuario.estado = createUserDto.estado || 'desactivado';
    
    return await this.entityManager.save(usuario);
  }

  async findAll(): Promise<Usuarios[]> {
    return await this.entityManager.find(Usuarios);
  }

  async getUserById(id: string): Promise<Usuarios> {
    const usuario = await this.entityManager.findOne(Usuarios, { where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async updateUser(id: string, updatedUserData: CreateUserDto): Promise<Usuarios> {
    const usuario = await this.getUserById(id);

    // Verificar si el nombre y apellido de usuario ya existe en la base de datos
    if (updatedUserData.nombre !== usuario.nombre && updatedUserData.apellido !== usuario.apellido) {
      const existingUser = await this.entityManager.findOne(Usuarios, 
        { where: { nombre: updatedUserData.nombre, apellido: updatedUserData.apellido }});
      console.log('existe usuario'+existingUser);
      
        if (existingUser) {
        throw new ConflictException('El nombre de usuario ya existe');
      }
    }

    // Actualizar los datos del usuario
    usuario.nombre = updatedUserData.nombre;
    usuario.apellido = updatedUserData.apellido;
    usuario.correo = updatedUserData.correo ;
    usuario.contraseña = updatedUserData.contraseña;
    usuario.estado = updatedUserData.estado || 'desactivado';

    // Guardar los cambios en la base de datos
    return this.entityManager.save(usuario);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await this.entityManager.remove(user);
  }
}