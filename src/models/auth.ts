
export type LoginReq = {
    phone_number: string;
    password: string;
}

export type RegisterReq = {
    phone_number: string;
    full_name: string;
    address: string;
    password: string;
}