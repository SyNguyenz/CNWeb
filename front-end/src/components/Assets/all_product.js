import iphone13_pink from './images/iphone13_pink.jpg'
import iphone13_black from './images/iphone13_black.jpg'
import iphone13_blue from './images/iphone13_blue.jpg'
import iphone13_white from './images/iphone13_white.jpg'
import s24p_tim from './images/s24-plus-tim.webp'
import s24p_den from './images/s24-plus-den.webp'
import s24p_vang from './images/s24-plus-vang.webp'
import s24p_xam from './images/s24-plus-xam.webp'
import mac_air_m2_silver from './images/macbook_air_m2_silver.webp'
import mac_air_m2_gray from './images/macbook_air_m2_gray.webp'
import apple from './images/apple.png'
import samsung from './images/samsung.png'


const all_products = [
  {
    "id": 1,
    "name": "Điện thoại iPhone 13 (128GB) - Chính hãng VN/A",
    "rating": 4.5,
    "images": [iphone13_black, iphone13_white, iphone13_blue, iphone13_pink],
    "old_price": 18000000,
    "sale": 25,
    "category": "Phone",
    "brand": {
      "name": "Apple",
      "image": apple,
    },
    "variants": [
      {"color": "Đen", "sale": 20},
      {"color": "Trắng", "sale": 20},
      {"color": "Xanh dương", "sale": 20},
      {"color": "Hồng", "sale": 15}],
    "description": ["Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C1",
    " 1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple.",
    "Giá sản phẩm đã bao gồm VAT."],
    "specification" : ["Màn hình OLED 6,7 inch, tốc độ làm mới 60Hz"]
    },

  {
    "id": 2,
    "name": "Điện Thoại Samsung Galaxy S24 Plus - 12GB/256GB - Chính Hãng",
    "rating": 4.5,
    "images": [s24p_tim, s24p_den, s24p_vang, s24p_xam],
    "old_price": 15000000,
    "sale": 20,
    "category": "Phone",
    "brand": {
      "name": "Samsung",
      "image": samsung,
    },
    "variants": [
      {"color": "Tím cà thơi", "price": 10000000},
      {"color": "Đen", "price": 10500000},
      {"color": "Vàng", "price": 10000000},
      {"color": "Xám", "price": 10000000},
      
    ],
    "description": ["Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C1",
    " 1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple.",
    "Giá sản phẩm đã bao gồm VAT."],
    "specification" : ["Màn hình OLED 6,7 inch, tốc độ làm mới 60Hz"]
  },
  {
    "id": 3,
    "name": "MacBook Air M2 13.6(16GB/256GB) - Chính hãng Apple Việt Nam",
    "rating": 3.5,
    "images": [mac_air_m2_gray, mac_air_m2_silver],
    "old_price": 28000000,
    "sale": 20,
    "category": "Laptop",
    "brand": {
      "name": "Apple",
      "image": apple,
    },
    "variants": [
      {"color": "Gray", "price": 23600000},
      {"color": "Silver", "price": 23000000},
    ],
    "description": ["Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C1",
    " 1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple.",
    "Giá sản phẩm đã bao gồm VAT."],
    "specification" : ["Màn hình OLED 6,7 inch, tốc độ làm mới 60Hz"]
    },
  
  

];

export default all_products;
