
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

export interface ContractRes {
    code: string; // Mã hợp đồng
    created_at: number; // Thời điểm tạo (timestamp)
    expired_at: number; // Thời điểm hết hạn (timestamp)
    id: number; // ID hợp đồng
    landlord_name: string; // Tên chủ nhà
    room_address: string; // Địa chỉ phòng
    room_number: number; // Số phòng
    signature_b: string; // Chữ ký bên B (Base64 string)
    signature_time_a: number; // Thời gian chữ ký bên A (timestamp)
    tenant_name: string; // Tên người thuê
  }