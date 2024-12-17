export interface BillingRes {
  id: number;
  code: string;
  contract_id: number;
  room_id: number;
  landlord_id: number;
  tenant_id: number;
  addition_fee: number;
  addition_note: string | null;
  total_amount: number;
  month: number;
  year: number;
  old_water_index: number;
  old_electricity_index: number;
  new_water_index: number;
  new_electricity_index: number;
  total_water_cost: number;
  total_electricity_cost: number;
  internet_cost: number;
  parking_fee: number;
  status: number;
  created_at: string; 
  updated_at: string;
}

export interface Billing {
  avatar: string;
  created_at: string;
  id: number;
  payment_id: number;
  room_number:number;
  status: number;
  tenant_name: string;
  total_amount: number;
}

export interface GetBillByMonthRes {
  address: string;
  list_bill: Billing[];
}

export interface BillingInfo {
  address: string;
  month: number;
  phone_number: string;
  room_number: number;
  tenant_name: string;
  year: number;
}

export interface GetBillingByIDRes {
  addition_fee: number;
  addition_note: string | null;
  code: string;
  created_at: string; // ISO Date format
  electricity_cost: number;
  id: number;
  info: BillingInfo; // Nested object
  internet_cost: number;
  new_electricity_index: number;
  new_water_index: number;
  old_electricity_index: number;
  old_water_index: number;
  paid_at: string | null; // Can be null if not paid
  parking_fee: number;
  room_price: number;
  status: number; // 1: Chưa thanh toán, 2: Đã thanh toán, ...
  total_amount: number;
  water_cost: number;
}