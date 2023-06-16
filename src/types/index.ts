export interface OrderDetail {
  productId: number,
  price: number,
  quantity: number,
  productImage?: string,
  productName?: string,
  categoryName?: string,
}
export interface Order {
  dateOfReceive: Date,
  customerId?: number,
  discount: number,
  totalPrice?: number,
  note: string,
  isPaid: boolean,
  Status?: number,
  detailAddress: string,
  provinceId: string,
  districtId: string,
  communeId: string,
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
  avatar: string;
}

export interface UpdateProfile {
  firstName: string;
  lastName: string;
  gender: number;
  birthday: Date;
  avatar?: string,
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

export interface Customer {
  type: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  confirmPassword: string
}

export interface ErrorLogin {
  username?: string,
  password?: string
}

export interface ErrorRegister {
  username?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?: string,
}
