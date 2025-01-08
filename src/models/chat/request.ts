export interface CreateRentalRequestReq {
  room_id: number;
  suggested_price: number;
  num_of_person: number;
  begin_date: Date;
  end_date: Date;
  addition_request: string;
}

export interface CreateReturnRequestReq {
  contract_id: number;
  reason: string;
  return_date: Date;
}
