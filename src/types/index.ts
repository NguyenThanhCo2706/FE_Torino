export interface OrderDetail {
  productId: number,
  price: number,
  quantity: number
}
export interface Order {
  dateOfReceive: Date,
  customerId?: number,
  discount: number,
  totalPrice?: number,
  note: string,
  isPaid: boolean,
  Status?: number,
  orderDetails: OrderDetail[]
}

export interface InfoUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: number;
  genderName: string;
  birthday: Date;
}

export interface UpdateProfile {
  firstName: string;
  lastName: string;
  gender: number;
  birthday: Date;
}

export interface ChangePassword {
  oldPassword: string,
  password: string,
  confirmPassword: string,
}

export interface AddressOption {
  id: string,
  name: string,
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  childCategories: Category[]
}
