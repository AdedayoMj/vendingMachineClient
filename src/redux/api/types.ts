export interface IUser {
  name: string;
  deposit: number;
  role: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}


export interface IProduct {
  [x: string]: any;
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  productImage: string;
  sellerId: any;
}


export interface IProduct {
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  productImage: string;
  sellerId: any;
}

export type IProductIndex = {
  product: IProduct[],

}

export interface IButton {
  currency: number;
}

export type IButtonIndex = {
  currencies: number[],

}