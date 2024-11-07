// Define UserInfo type
export type UserInfo = {
    id: number;
    name: string;
    phone_number: string;
    full_name: string;
    address: string;
  };
  
  // Define AuthSlice interface with userInfo and setUserInfo
  export interface AuthSlice {
    userInfo: UserInfo | undefined;
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
  }
  