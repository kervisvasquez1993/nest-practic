//controladores.Autorizar-Usuario.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ServicioAutorizado } from '../servicios/servicios.autorizado';
import { sign } from 'jsonwebtoken';

@Controller('autorizado')
export class AuthUsuaController {
  constructor(private readonly servicioAutorizado: ServicioAutorizado) {}

  @Post('login')
  async login(@Body() body: { nombre: string; contraseña: string }) {
    const usuarioAutorizado = await this.servicioAutorizado.validateUser(body.nombre, body.contraseña);
    
    if (usuarioAutorizado) {
      // Generar el token de acceso con jsonwebtoken
      const token = sign(
        { nombre: usuarioAutorizado.nombre },
        'mi_clave_secreta', // Debes cambiar esto por tu clave secreta
        { expiresIn: '1h' } // El token expirará en 1 hora
      );
      
      return { token };
    } else {
      return { error: 'Credenciales inválidas' };
    }
  }
}
