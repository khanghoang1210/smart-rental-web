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
