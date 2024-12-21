// Define UserInfo type
export type UserInfo = {
    id: number;
    name: string;
    phone_number: string;
    avatar_url: string;
    full_name: string;
    gender: number;
    dob: string;
    total_room: number;
    total_rating: number;
    address: string;
    role: number;
  };
  
  // Define AuthSlice interface with userInfo and setUserInfo
  export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
  }
  