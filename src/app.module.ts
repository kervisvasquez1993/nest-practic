//app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './servicios/servicios.usuario';
import { ServicioAutorizado } from './servicios/servicios.autorizado';
import { UsuarioController } from './controladores/controladores.usuario';
import { AuthUsuaController } from './controladores/controladores.Autorizar-Usuario';
import { ServicioModulo} from './modulos/modulos.servicio.modulo';
import { UsuariosModulo } from './modulos/modulos.usuarios.modulo';
import { Usuarios } from './entidades/usuario.entity';
import { Permisos } from './entidades/permisos.entity';
import { Roles } from './entidades/roles.entity';
import { Productos } from './entidades/productos.entity';
import { CategoriasProd } from './entidades/catego-produ.entity';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'alex',
      password: '123',
      database: 'productos',
      autoLoadEntities: true,
      synchronize: true,
      name: 'default',
      entities: [Usuarios,Roles,Permisos,Productos,CategoriasProd]
    }),
    TypeOrmModule.forFeature([Usuarios,Roles,Permisos,Productos,CategoriasProd])/*,ServicioModulo,UsuariosModulo*/
    ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}