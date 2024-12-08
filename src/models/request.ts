import { UserInfo } from "@/store/slice/authSlice";

export interface RentalRequestRes {
    id: number;
    code: string;
    sender: UserInfo;
    room_id: number;
    suggested_price: number;
    num_of_person: number;
    begin_date: string; // ISO string format
    end_date: string; // ISO string format
    addition_request: string;
    status: number; // Consider using an enum if status has predefined values
    created_at: string; // ISO string format
    updated_at: string; // ISO string format
  }
  
  export interface ReturnRequestRes {
    id: number;
    contract_id: number;
    room_id: number;
    reason: string;
    return_date: string; // ISO date format
    status: number;
    deduct_amount: number;
    total_return_deposit: number;
    created_user: UserInfo;
    created_at: string; // ISO date format
    updated_at: string; // ISO date format
  }
  