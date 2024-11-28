interface OrderData {
    sonha: string;
    phuong: string;
    phiShip: number;
    huyen: string;
    tinh: string;
}
interface Order {
    user_id: number | null;
    address: string;
    orderProducts: OrderProduct[];
    phiShip: number;
}
interface OrderProduct {
    products_id: number;
    quantity: number;
}