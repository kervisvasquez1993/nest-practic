import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from '../servicios/servicios.usuario';
import { Usuarios } from '../entidades/usuario.entity';
//import { ServicioAutorizado } from '../servicios/servicios.autorizado';
import { CreateUserDto } from '../dtos/dtos.crear-usuario.dto';

@Controller('users')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    //private readonly serviceautorizado: ServicioAutorizado
  ) {}
  /*
  @Post('login')
  async login(@Body() usuario: Usuarios) {
    const user = await this.serviceautorizado.validateUser(usuario.nombre, usuario.contraseña);
    if (!user) {
      return { message: 'Usuario o contraseña incorrectos' };
    }
    const token = await this.serviceautorizado.generateToken(user);
    return { access_token: token };
  }
  */

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Usuarios> {
    return this.usuarioService.createUser(createUserDto);
  }

  @Get()
  async getUserAll(): Promise<Usuarios[]> {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Usuarios> {
    return this.usuarioService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updatedUserData: CreateUserDto): Promise<Usuarios> {
    return this.usuarioService.updateUser(id, updatedUserData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usuarioService.deleteUser(id);
  }
}