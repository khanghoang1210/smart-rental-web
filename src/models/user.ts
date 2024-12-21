export type UserRes = {
  id: number;
  phone_number: string;
  full_name: string;
  address: string;
};

export interface BankInfoRes {
  user_id: number;
  bank_id: number;
  bank_name: string;
  short_name: string;
  account_name: string;
  account_number: string;
  created_at: string;
  updated_at: string;
}
