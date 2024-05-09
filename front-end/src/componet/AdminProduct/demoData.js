const products = [
  {
    maHangHoa: 'P001',
    tenHangHoa: 'Laptop Dell XPS 13',
    hangSanXuat: 'Dell',
    thongTin: 'Laptop cao cấp với màn hình 13 inch, hiệu suất cao và thiết kế mỏng nhẹ.',
    thongSo: 'CPU: Intel Core i7, RAM: 16GB, SSD: 512GB, Display: 13.3" 4K UHD',
    gia: 35000000,
    rating: 4.5,
    star5: 120,
    star4: 30,
    star3: 10,
    star2: 5,
    star1: 3,
    loaiHangHoa: 'Laptop',
    variants: [
      {
        color: 'Silver',
        quantity: 10,
        sale: 10, // Giảm giá 10%
        image: 'https://laptops.vn/uploads/dell-xps-13-2024_1710930026.jpg',
      },
      {
        color: 'Black',
        quantity: 5,
        sale: 5, // Giảm giá 5%
        image: 'https://laptopcuongphat.com/hoanghung/5/images/dell-xps-9365-mat-lung-nam-anh-lap-top.jpg',
      },
    ],
  },
  {
    maHangHoa: 'P002',
    tenHangHoa: 'Smartphone Samsung Galaxy S21',
    hangSanXuat: 'Samsung',
    thongTin: 'Điện thoại thông minh với màn hình 6.2 inch, camera chất lượng cao và hiệu suất vượt trội.',
    thongSo: 'CPU: Exynos 2100, RAM: 8GB, Storage: 128GB, Display: 6.2" FHD+',
    gia: 20000000,
    rating: 4.7,
    star5: 200,
    star4: 50,
    star3: 15,
    star2: 4,
    star1: 1,
    loaiHangHoa: 'Smartphone',
    variants: [
      {
        color: 'Phantom Gray',
        quantity: 15,
        sale: 15, // Giảm giá 15%
        image: 'https://example.com/images/samsung-galaxy-s21-gray.jpg',
      },
      {
        color: 'Phantom White',
        quantity: 7,
        sale: 20, // Giảm giá 20%
        image: 'https://example.com/images/samsung-galaxy-s21-white.jpg',
      },
    ],
  },
  {
    maHangHoa: 'P003',
    tenHangHoa: 'Apple MacBook Pro 16',
    hangSanXuat: 'Apple',
    thongTin: 'MacBook Pro với màn hình 16 inch, hiệu suất cực mạnh và thiết kế sang trọng.',
    thongSo: 'CPU: Apple M1 Pro, RAM: 16GB, SSD: 1TB, Display: 16" Retina',
    gia: 60000000,
    rating: 4.8,
    star5: 150,
    star4: 40,
    star3: 8,
    star2: 2,
    star1: 0,
    loaiHangHoa: 'Laptop',
    variants: [
      {
        color: 'Space Gray',
        quantity: 8,
        sale: 5, // Giảm giá 5%
        image: 'https://example.com/images/macbook-pro-16-space-gray.jpg',
      },
      {
        color: 'Silver',
        quantity: 10,
        sale: 10, // Giảm giá 10%
        image: 'https://example.com/images/macbook-pro-16-silver.jpg',
      },
    ],
  },
  {
    maHangHoa: 'P004',
    tenHangHoa: 'Sony WH-1000XM4',
    hangSanXuat: 'Sony',
    thongTin: 'Tai nghe không dây chống ồn hàng đầu với chất lượng âm thanh tuyệt vời.',
    thongSo: 'Battery Life: 30 hours, Connectivity: Bluetooth 5.0, Noise Cancelling: Yes',
    gia: 7000000,
    rating: 4.6,
    star5: 180,
    star4: 60,
    star3: 12,
    star2: 6,
    star1: 2,
    loaiHangHoa: 'Tai nghe',
    variants: [
      {
        color: 'Black',
        quantity: 20,
        sale: 10, // Giảm giá 10%
        image: 'https://example.com/images/sony-wh1000xm4-black.jpg',
      },
      {
        color: 'Silver',
        quantity: 15,
        sale: 8, // Giảm giá 8%
        image: 'https://example.com/images/sony-wh1000xm4-silver.jpg',
      },
    ],
  },
  {
    maHangHoa: 'P005',
    tenHangHoa: 'Apple iPad Pro 11',
    hangSanXuat: 'Apple',
    thongTin: 'Máy tính bảng với màn hình 11 inch, hiệu suất mạnh mẽ và hỗ trợ Apple Pencil.',
    thongSo: 'CPU: Apple M1, RAM: 8GB, Storage: 256GB, Display: 11" Liquid Retina',
    gia: 25000000,
    rating: 4.9,
    star5: 250,
    star4: 30,
    star3: 5,
    star2: 2,
    star1: 1,
    loaiHangHoa: 'Máy tính bảng',
    variants: [
      {
        color: 'Space Gray',
        quantity: 12,
        sale: 10, // Giảm giá 10%
        image: 'https://example.com/images/ipad-pro-11-space-gray.jpg',
      },
      {
        color: 'Silver',
        quantity: 10,
        sale: 12, // Giảm giá 12%
        image: 'https://example.com/images/ipad-pro-11-silver.jpg',
      },
    ],
  },
];

export default products;
