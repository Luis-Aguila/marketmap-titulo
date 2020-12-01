export interface Mercado {
    id?: string;
    nombre: string;
    tipo: string;
    detalle: string;
    ofertas: ['', '', ''];
    latitud: number;
    longitud: number;
    propietario: string;
    direccion: string;
    portada: string;
    estado: boolean;
    atencion: string;
    galeria: ['', '', '', '', ''];
    icon: string;
    contacto: string;
}