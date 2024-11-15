export interface Comment {
  id: number;
  author: string;
  text: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface dataProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  comments: any[]; // Use a more specific type if you know the structure of comments
}
export interface listProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  comments: any[];

}
export type ProductResponse = listProduct[];

