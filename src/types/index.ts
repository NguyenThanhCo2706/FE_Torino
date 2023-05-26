export interface Order {
  dateOfReceive: Date,
  customerId?: number,
  discount: number,
  totalPrice: number,
  note: string,
  isPaid: number,
  orderDetails: Array<{
    productId: number,
    price: number,
    quantity: number
  }>
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