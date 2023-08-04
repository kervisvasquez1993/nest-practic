import { CategoriasProd } from "src/entidades/catego-produ.entity";

export interface dtoCrearProducto {
    id_produ: string;
    producto: string;
    precio: number;
    descripcion: string;
    id_cate?: Promise<CategoriasProd[]>;
}