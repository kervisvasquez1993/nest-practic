// src/modulos/modulos.usuarios.modulo.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../entidades/usuario.entity';
import { UsuarioService } from '../servicios/servicios.usuario';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuariosModulo {}
