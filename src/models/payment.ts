export interface BankRes {
    id: number;
    bank_name: string;
    bank_code:string;
    short_name: string;
    logo: string;
    created_at: string;
    updated_at:string;
}

export interface PaymentInfoRes{
    bank_name:string;
    bank_logo:string;
    account_name:string;
    account_number:string;
    amount: number;
    tranfer_content: string;
    qr_url:string;
}