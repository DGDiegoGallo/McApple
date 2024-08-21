export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IOrder {
    id: number;
    status: string;
    date: string;
}

export interface ICredential {
    id: number;
    password: string;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
    fetchProductDetail?: (id: number) => Promise<IProduct>;
}

export interface IRegisteredUser {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
}

export interface ILoginUserWithToken {
    email: string;
    password: string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        address: string;
        phone: string;
        role: string;
        credential: {
            id: number;
            password: string;
        };
    };
}

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