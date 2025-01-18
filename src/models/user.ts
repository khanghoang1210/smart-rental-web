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

export interface RatingInfo {
  rater_name: string;
  rater_avatar: string;
  created_at: string;
  rate: number;
  comment: string;
  happy: string;
  unhappy: string;
}

export interface UserDetailRes {
  id: number;
  phone_number: string;
  avatar_url: string;
  role: number;
  full_name: string;
  gender: number;
  dob: string;
  total_room: number;
  total_rating: number;
  avg_rating: number;
  address: string;
  rating_info: RatingInfo[];
  wallet_address: string;
  private_key_hex: string;
  created_at: string | null;
}