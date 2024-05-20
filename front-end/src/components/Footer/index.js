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
                                - Về Chúng Tôi
                            </li>
                            <li>
                                - Blog
                            </li>
                            <li>
                                - Cơ Hội Nghề Nghiệp
                            </li>
                            <li>
                                - Cửa Hàng
                            </li>
                        
                        </ul>
                    </div>
                    <div className="footer-top-sp">
                        <h2>Always-on Support</h2>
                        <p>- Support 039 6666 666 (07:00-21:00)</p>
                        <p>- Delivery 039 6666 666 (07:00-21:00)</p>
                    </div>
                    <div className="footer-top-delivery">
                        <h2>Delivery</h2>
                        <ul>
                            <li>
                                - Shipping methods
                            </li>
                            <li>
                                - Payment
                            </li>
                            <li>
                                - Cash voucher
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;

