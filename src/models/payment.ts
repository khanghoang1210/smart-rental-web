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
    short_name: string;
    logo:string;
    account_name:string;
    account_number:string;
    amount: number;
    tranfer_content: string;
    qr_url:string;
}

export interface PaymentRes {
    id: number;
    code: string;
    sender_name: string;
    bill_id: number;
    contract_id: number | null;
    amount: number;
    status: number;
    return_request_id: number | null;
    paid_time: string;
    tranfer_content: string;
    evidence_image: string | null;
}