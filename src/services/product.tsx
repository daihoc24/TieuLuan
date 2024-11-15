import axios, { AxiosResponse } from "axios";
import { listProduct, ProductResponse } from "../interfaces/product";
class ProductService {
    fetchProductApi(): Promise<AxiosResponse<ProductResponse>> {
      return axios({
        url: `http://localhost:3031/products`,
        method: "GET",
      });
    }
    fetchProductDetailApi(id: number): Promise<AxiosResponse<any>> {
        return axios({
          url: `http://localhost:3031/products/${id}`,
          method: 'GET',
        });
      }
    }
  
export const productService: ProductService = new ProductService();
