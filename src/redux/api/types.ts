export interface IUser {
  name: string;
  deposit: number;
  role: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IChange {
  coinChanges: number[];
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
export interface ITransact {
  productName: string;
  availableBalance: number;
  totalCostOfProduuct: number;
}


export type IProductIndex = {
  product: IProduct[],

}
export type IQauntity = {
  _id: string;
  productName: string;
  amountAvailable: number;
  cost: number;
  productImage: string;
  sellerId: any;
  totalprice: number,
  availableChange: number[],
}

export interface IButton {
  currency: number;
}

export type IButtonIndex = {
  currencies: number[],

}