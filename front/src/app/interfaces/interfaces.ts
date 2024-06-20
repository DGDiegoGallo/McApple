// Interfaz para registrar usuario
export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

// Interfaz para login de usuario
export interface ILoginUser {
    email: string;
    password: string;
}

// Interfaz para orden
export interface IOrder {
    userId: number;
    products: number[];
}

// Interfaz para credenciales
export interface ICredential {
    id: number;
    password: string;
}

// Interfaz para productos
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

// Interfaz para usuario registrado
export interface IRegisteredUser {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
}

// Interfaz para login con token
export interface ILoginUserWithToken {
    email: string;
    password: string;
    token: string;
}

// Interfaz para usuario registrado con token
export interface IRegisteredUserWithToken {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
    token: string;
    credential: {
        id: number;
        password: string;
    };
}
