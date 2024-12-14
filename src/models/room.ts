import { UserInfo } from "@/store/slice/authSlice";
import { UserRes } from "./user";

export interface CreateRoomForm {
  title: string;
  address: string[] | undefined[];
  roomNumber: number;
  roomImages: File[];
  utilities: string[];
  description: string;
  roomType: string;
  owner: number | undefined;
  capacity: number;
  gender: number;
  area: number;
  totalPrice: number;
  deposit: number;
  electricityCost: number;
  waterCost: number;
  internetCost: number;
  isParking: boolean;
  parkingFee: number;
  status: number;
  isRent: boolean;
}

export interface RoomRes {
  id: number;
  title: string;
  address: string[] | undefined[];
  room_number: number;
  room_images: string[];
  utilities: string[];
  description: string;
  room_type: string;
  owner: UserRes;
  capacity: number;
  gender: number;
  area: number;
  total_price: number;
  deposit: number;
  electricity_cost: number;
  water_cost: number;
  internet_cost: number;
  is_parking: boolean;
  parking_fee: number;
  status: number;
  is_rent: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  city: string;
  district: string;
  ward: string;
  street: string;
  houseNumber: string;
}
