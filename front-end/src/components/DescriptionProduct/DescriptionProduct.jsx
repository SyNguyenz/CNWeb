import React, { useState } from 'react';
import './DescriptionProduct.css';

function DescriptionProduct({ product }) {
    const [activeTab, setActiveTab] = useState('info'); // Mặc định hiển thị thông tin sản phẩm

    return (
        <div className='product'>
            <div className="product-nav">
                <div className={`product-nav-box ${activeTab === 'info' ? 'fade' : ''}`} onClick={() => setActiveTab('info')}>
                    Thông tin sản phẩm
                </div>
                <div className={`product-nav-box ${activeTab === 'specs' ? 'fade' : ''}`} onClick={() => setActiveTab('specs')}>
                    Thông số kỹ thuật
                </div>
            </div>
            <div className="product-description">
                {activeTab === 'info' && (
                    product.description.map((element, index) => 
                        <p key={index}>{element}</p>
                    )
                )}
                {activeTab === 'specs' && (
                    product.specification.map((element, index) => 
                    <p key={index}>{element}</p>
                ))}
            </div>
        </div>
    );
}

export default DescriptionProduct;
