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
