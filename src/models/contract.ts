
export interface CreateContractRequest {
  address: string[]; // Array of strings
  party_a: number; // Corresponds to int32 in Go
  party_b: number; // Corresponds to int32 in Go
  request_id: number; // Corresponds to int32 in Go
  room_id: number; // Corresponds to int32 in Go
  actual_price: number; // Corresponds to int64 in Go
  payment_method: string | null; // Corresponds to *string in Go
  electricity_method: string; // Corresponds to string in Go
  electricity_cost: number; // Corresponds to int64 in Go
  water_method: string; // Corresponds to string in Go
  water_cost: number; // Corresponds to int64 in Go
  internet_cost: number; // Corresponds to int64 in Go
  parking_fee: number | null; // Corresponds to *int64 in Go
  deposit: number; // Corresponds to int64 in Go
  begin_date: string | null; // ISO string for pgtype.Date
  end_date: string | null; // ISO string for pgtype.Date
  responsibility_a: string; // Corresponds to string in Go
  responsibility_b: string; // Corresponds to string in Go
  general_responsibility: string | null; // Corresponds to *string in Go
  signature_a: string; // Base64 string
  signed_time_a: string; // ISO string for pgtype.Timestamptz
}