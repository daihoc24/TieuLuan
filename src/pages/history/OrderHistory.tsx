import { useEffect, useState } from 'react';
import './OrderHistory.scss'; // Đảm bảo bạn có file CSS tương ứng
import { useOrderLogic } from "../order/OrderLogic";
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const navigate = useNavigate();
    const { formatPrice } = useOrderLogic(); // Sử dụng hook để định dạng giá

    useEffect(() => {
        // Lấy userId từ sessionStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;

        if (!userId) {
            console.error('User ID không tồn tại.');
            return;
        }

        // Lấy danh sách đơn hàng từ API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3003/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Lọc các đơn hàng của người dùng hiện tại
                const userOrders = data.filter((order: any) => order.userId === userId);

                // Sắp xếp đơn hàng theo ngày tạo
                userOrders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setOrders(userOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewDetails = (order: any) => {
        sessionStorage.setItem('orderData', JSON.stringify(order)); // Lưu thông tin đơn hàng vào sessionStorage
        navigate('/orderDetail'); // Điều hướng đến trang chi tiết đơn hàng
    };

    if (orders.length === 0) {
        return <div>Không có đơn hàng nào.</div>; // Hiển thị thông báo nếu không có đơn hàng
    }

    return (
        <div className="orderHistoryContainer">
            <h2 style={{ textAlign: 'center', color: "#006600", marginBottom: "50px" }}>Lịch sử đơn hàng</h2>
            <table className="orderTable">
                <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Trạng thái</th>
                    <th>Phí vận chuyển</th>
                    <th>Tổng tiền</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order: any, index: number) => (
                    <tr key={index}>
                        <td>
                            {order.products.length > 0 && (
                                <img
                                    src={order.products[0].image}
                                    alt={order.products[0].name}
                                    className="productImage"
                                />
                            )}
                        </td>
                        <td>{order.status}</td>
                        <td>{formatPrice(order.phiShip)}</td>
                        <td>{formatPrice(order.totalAmount + order.phiShip)}</td>
                        <td>
                            <button className={"button"} style={{background: "green", width: "140px", padding: "10px", borderRadius: "10px", color: "white"}} onClick={() => handleViewDetails(order)}>Xem chi tiết</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistoryPage;
