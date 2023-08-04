import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuarios } from '../entidades/usuario.entity';

@Injectable()
export class ServicioAutorizado {
  constructor(
    private readonly UsuariosRepository: Repository<Usuarios>
  ) {}
  
  private async getUserByCredentials(nombre: string, contraseña: string): Promise<Usuarios> {
    const usuario = await this.UsuariosRepository.findOne({ where: { nombre, contraseña } });
    return usuario;
  }
   async validateUser(nombre: string, contraseña: string): Promise<UsuarioAutorizado> {
    const usuario = await this.getUserByCredentials(nombre, contraseña);
    if (usuario) {
      // Si las credenciales son válidas, devolver los datos del usuario autorizado
      return {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        contraseña: usuario.contraseña,
      };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
  /*
  async generateToken(usuario: Usuarios): Promise<string> {
    const payload = { nombre: usuario.nombre, contra: usuario.contraseña };
   return '';//this.jwtService.sign(payload);
  }
  */
}

