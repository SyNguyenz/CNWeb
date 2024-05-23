import React, { useState, useEffect} from 'react';
import './CheckOrder.css'
function CheckOrder() {
        const [orderID, setOrderID] = useState('');
        const [orderInfo, setOrderInfo] = useState(null);

        useEffect(() => { 
          window.scrollTo(0, 0);  
        },[]);
    
        const handleSubmit = (event) => {
          event.preventDefault();
          if (validFormCheckOrder()) {
            // Simulate fetching order information
            const fetchedOrderInfo = fetchOrderInfoFromServer(orderID);
            setOrderInfo(fetchedOrderInfo);
          }
        };
      
        const validFormCheckOrder = () => {
          if (!orderID) {
            alert('Vui lòng nhập mã đơn hàng');
            return false;
          }
          return true;
        };
      
        const fetchOrderInfoFromServer = (orderID) => {
          // Simulated function to fetch order information from the server
          // Replace this with actual API call
          return {
            // Sample order information, replace with actual fetched data
            orderID: orderID,
            // Other order details...
          };
        };
      
  return (
    <div className="container-check">
      <div className="check-order-index">
        <div className="check-order-form">
          <h1>KIỂM TRA ĐƠN HÀNG CỦA BẠN ^-^</h1>
          <form onSubmit={handleSubmit} className='form-check'>
            <div className="">
              <input
                className='input-check'
                type="text"
                id="OrderID"
                name="OrderID"
                title="Mã đơn hàng"
                placeholder="Vui lòng nhập mã đơn hàng *"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
                required
              />
            </div>
            <div className="">
              <button className = "button-check"type="submit">TRA CỨU</button>
            </div>
          </form>
          {orderInfo && (
          <div className="order-info">
            <h2>Thông tin đơn hàng</h2>
            <p>Mã đơn hàng: {orderInfo.orderID}</p>
            {/* Render other order details here */}
          </div>
        )}
        
        </div>
        <div className="you-know">
          <div className="ctn">
            <div className="text-check">
              <strong>ĐĂNG NHẬP SẼ GIÚP BẠN QUẢN LÝ ĐƠN HÀNG CỦA MÌNH VÀ TRẢI NGHIỆM WEBSITE TỐT HƠN !</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOrder;
