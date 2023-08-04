// modulos.servicio.modulo.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../entidades/usuario.entity'; // Asegúrate de importar la entidad Usuarios
import { ServicioAutorizado } from '../servicios/servicios.autorizado';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])], // Asegúrate de importar la entidad Usuarios aquí
  providers: [ServicioAutorizado],
  exports: [ServicioAutorizado],
})
export class ServicioModulo {}
