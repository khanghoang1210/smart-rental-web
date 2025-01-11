import { UserInfo } from "@/store/slice/authSlice";
import { RoomRes } from "./room";

export interface RentalRequestByIDRes {
  id: number;
  code: string;
  sender: UserInfo;
  room: RoomRes;
  suggested_price: number;
  num_of_person: number;
  begin_date: string; // ISO string format
  end_date: string; // ISO string format
  addition_request: string;
  status: number; // Consider using an enum if status has predefined values
  created_at: string; // ISO string format
  updated_at: string; // ISO string format
}

export interface RequestInfo {
  avatar: string;
  created_at: string; // ISO date format
  id: number;
  name: string;
  status: number; // Consider creating an enum if the status values have specific meanings
}

// Interface for room information
export interface Room {
  address: string[]; // Array of address components
  id: number;
  price: number; // Room price
  title: string; // Room title
}

// Interface for the main response object
export interface RentalRequestRes {
  request_count: number; // Total request count
  request_info: RequestInfo[]; // Array of request details
  room: Room; // Room details
}

export interface ReturnRequestRes {
  id: number;
  contract_id: number;
  room_id: number;
  room: RoomRes;
  reason: string;
  return_date: string; // ISO date format
  status: number;
  deduct_amount: number;
  total_return_deposit: number;
  created_user: UserInfo;
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
}

export interface ProcessTrackingRes {
  id: number;
  actor: UserInfo;
  action: string;
  issued_at: string; 
  request_id: number;
}
