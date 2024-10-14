
export type LoginReq = {
    phone_number: string;
    password: string;
}

export type SignUpReq = {
    userName: string;
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}