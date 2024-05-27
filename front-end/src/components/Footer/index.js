import React from 'react';
import "./Footer.css";
function Footer(props) {
    return (
        <section id="footer">
            <div className="footer">
                <div className="footer-top">
                    <div className="footer-top-name">
                        <h2>Tech Store</h2>
                    </div>
                    <div className="footer-top-about">
                        <h2>about</h2>
                        <ul>
                        
                            <li>
                            Tech Store là địa chỉ tin cậy cho mọi người khi tìm kiếm các sản phẩm điện máy và điện tử chất lượng cao.
                            </li>
                            <li>
                            Với cam kết về chất lượng và dịch vụ chuyên nghiệp, chúng tôi luôn đảm bảo rằng mỗi khách hàng đều có trải nghiệm mua sắm tốt nhất khi đến với chúng tôi. Hãy ghé thăm cửa hàng của chúng tôi ngay hôm nay để khám phá thế giới công nghệ đầy sáng tạo và tiện ích!
                            </li>
                            
                        
                        </ul>
                    </div>
                    <div className="footer-top-sp">
                        <h2>Always-on Support</h2>
                        <p>- Support 039 6666 666 (07:00-21:00)</p>
                        <p>- Delivery 039 6666 666 (07:00-21:00)</p>
                    </div>
                    <div className="footer-top-delivery">
                        <h2>Payment</h2>
                        <ul>
                            <li>
                            Phương thức thanh toán: Chọn thanh toán bằng thẻ, chuyển khoản, COD và ví điện tử. 
                            </li>
                            <li>
                            Voucher: Nhận ưu đãi đặc biệt với voucher tiền mặt. Theo dõi để không bỏ lỡ các ưu đãi mới!
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;

