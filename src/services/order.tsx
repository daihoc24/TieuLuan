import { AxiosResponse } from "axios";
import { request } from "../config/api";

class OrderService {
  getListOrderByUserID(userId: number|undefined) :Promise<AxiosResponse<any>> {
    return request({
      url: `/Order/getListOrderByUserID/${userId}`,
      method: "GET",
    });
  }
  getOrderById(orderId: number | undefined) :Promise<AxiosResponse<any>> {
    return request({
        url: `/Order/getOrderById/${orderId}`,
        method: "GET",
      });
  }
  createOrder(data: Order) {
    return request({
      url: "/Order/createOrder",
      method: "POST",
      data,
    });
  }
}

export const orderService = new OrderService();
