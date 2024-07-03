import { IShipToAddress } from "./address";
export interface IDeliveryMethod {
    id: number;
    isDelete: boolean;
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
  }
  //for request == body for request
  export interface IOrderRequest {
    basketId: string;
    deliveryMethodId: number;
    buyerPhoneNumber: string;
    shipToAddress: IShipToAddress;
    portalType: number;
  }
  //for response 
  export interface IOrder {
    id: number;
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    buyerPhoneNumber: string;
    subTotal: number;
    trackingCode: string;
    isFinally: boolean;
    total: number;
    portal: Portal;
    portalType: number|string;
    authority: string;
    link: string;
    status: number|string|OrderStatusEnum;
    shipToAddress: IShipToAddress;
    deliveryMethod: IDeliveryMethod;
    orderItems: IOrderItem[];
  }

  export enum OrderStatusEnum{
    درحال_بررسی =1,
    درحال_پردازش,
   تحویل_اداره_پست,
   ارسال_شده,
   تحویل_داده_شده,
   بازگشت_داده_شده,
   انصراف_داده_شده,
   ناموفق,
  }

  interface IOrderItem {
    productItemId: number;
    productName: string;
    productTypeName: string;
    productBrandName: string;
    pictureUrl: string;
    id: number;
    price: number;
    quantity: number;
  }
  interface Portal {
    id: number;
    orderId: number;
    gateway: number;
    status: number;
    createdOn: string;
    amount: number;
    referenceId: string;
  }
