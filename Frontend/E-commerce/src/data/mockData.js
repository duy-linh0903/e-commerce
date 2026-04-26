// ==================== CATEGORIES ====================
export const categories = [
  { id: 1, name: "Điện thoại", slug: "dien-thoai", parentId: null, productCount: 24 },
  { id: 2, name: "Laptop", slug: "laptop", parentId: null, productCount: 18 },
  { id: 3, name: "Máy tính bảng", slug: "may-tinh-bang", parentId: null, productCount: 12 },
  { id: 4, name: "Tai nghe", slug: "tai-nghe", parentId: null, productCount: 30 },
  { id: 5, name: "Đồng hồ thông minh", slug: "dong-ho-thong-minh", parentId: null, productCount: 15 },
  { id: 6, name: "Phụ kiện", slug: "phu-kien", parentId: null, productCount: 50 },
  { id: 7, name: "Màn hình", slug: "man-hinh", parentId: null, productCount: 10 },
  { id: 8, name: "Bàn phím & Chuột", slug: "ban-phim-chuot", parentId: null, productCount: 22 },
];

// ==================== PRODUCTS ====================
export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    categoryId: 1,
    brand: "Apple",
    basePrice: 29990000,
    description:
      "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP chuyên nghiệp, màn hình Super Retina XDR 6.7 inch và khung titanium cao cấp.",
    thumbnail: "https://placehold.co/400x400?text=iPhone+15+Pro+Max",
    images: [
      "https://placehold.co/800x800?text=iPhone+15+Pro+Max+1",
      "https://placehold.co/800x800?text=iPhone+15+Pro+Max+2",
      "https://placehold.co/800x800?text=iPhone+15+Pro+Max+3",
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    variants: [
      { id: 101, label: "256GB - Đen Titan", storage: "256GB", color: "Đen Titan", price: 29990000, stock: 15 },
      { id: 102, label: "256GB - Trắng Titan", storage: "256GB", color: "Trắng Titan", price: 29990000, stock: 10 },
      { id: 103, label: "512GB - Đen Titan", storage: "512GB", color: "Đen Titan", price: 33990000, stock: 12 },
      { id: 104, label: "1TB - Titan Tự nhiên", storage: "1TB", color: "Titan Tự nhiên", price: 39990000, stock: 8 },
    ],
    specs: {
      "Màn hình": "6.7 inch Super Retina XDR",
      "Chip": "A17 Pro",
      "RAM": "8GB",
      "Camera sau": "48MP + 12MP + 12MP",
      "Pin": "4422 mAh",
      "OS": "iOS 17",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    categoryId: 1,
    brand: "Samsung",
    basePrice: 31990000,
    description:
      "Samsung Galaxy S24 Ultra với bút S Pen tích hợp, camera 200MP, màn hình Dynamic AMOLED 2X 6.8 inch và chip Snapdragon 8 Gen 3.",
    thumbnail: "https://placehold.co/400x400?text=S24+Ultra",
    images: [
      "https://placehold.co/800x800?text=S24+Ultra+1",
      "https://placehold.co/800x800?text=S24+Ultra+2",
    ],
    featured: true,
    rating: 4.7,
    reviewCount: 98,
    stock: 35,
    variants: [
      { id: 201, label: "256GB - Đen", storage: "256GB", color: "Đen", price: 31990000, stock: 10 },
      { id: 202, label: "512GB - Xám Titan", storage: "512GB", color: "Xám Titan", price: 35990000, stock: 12 },
      { id: 203, label: "1TB - Vàng Titan", storage: "1TB", color: "Vàng Titan", price: 41990000, stock: 8 },
    ],
    specs: {
      "Màn hình": "6.8 inch Dynamic AMOLED 2X",
      "Chip": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Camera sau": "200MP + 12MP + 50MP + 10MP",
      "Pin": "5000 mAh",
      "OS": "Android 14",
    },
  },
  {
    id: 3,
    name: "MacBook Pro 14 inch M3 Pro",
    slug: "macbook-pro-14-m3-pro",
    categoryId: 2,
    brand: "Apple",
    basePrice: 49990000,
    description:
      "MacBook Pro 14 inch với chip M3 Pro, màn hình Liquid Retina XDR, pin lên đến 18 giờ và hiệu năng chuyên nghiệp vượt trội.",
    thumbnail: "https://placehold.co/400x400?text=MacBook+Pro+14",
    images: ["https://placehold.co/800x800?text=MacBook+Pro+14+1"],
    featured: true,
    rating: 4.9,
    reviewCount: 76,
    stock: 20,
    variants: [
      { id: 301, label: "M3 Pro 18GB/512GB - Đen vũ trụ", ram: "18GB", storage: "512GB", color: "Đen vũ trụ", price: 49990000, stock: 8 },
      { id: 302, label: "M3 Pro 18GB/1TB - Bạc", ram: "18GB", storage: "1TB", color: "Bạc", price: 57990000, stock: 7 },
      { id: 303, label: "M3 Max 36GB/1TB - Đen vũ trụ", ram: "36GB", storage: "1TB", color: "Đen vũ trụ", price: 74990000, stock: 5 },
    ],
    specs: {
      "Màn hình": "14.2 inch Liquid Retina XDR",
      "Chip": "Apple M3 Pro",
      "RAM": "18GB",
      "Bộ nhớ": "512GB SSD",
      "Pin": "Đến 18 giờ",
      "OS": "macOS Sonoma",
    },
  },
  {
    id: 4,
    name: "Dell XPS 15 9530",
    slug: "dell-xps-15-9530",
    categoryId: 2,
    brand: "Dell",
    basePrice: 42990000,
    description:
      "Dell XPS 15 với màn hình OLED 3.5K, Intel Core i7 thế hệ 13, card đồ họa RTX 4060 và thiết kế cao cấp mỏng nhẹ.",
    thumbnail: "https://placehold.co/400x400?text=Dell+XPS+15",
    images: ["https://placehold.co/800x800?text=Dell+XPS+15"],
    featured: false,
    rating: 4.5,
    reviewCount: 45,
    stock: 15,
    variants: [
      { id: 401, label: "i7/16GB/512GB/RTX4060", processor: "i7-13700H", ram: "16GB", storage: "512GB", price: 42990000, stock: 8 },
      { id: 402, label: "i9/32GB/1TB/RTX4070", processor: "i9-13900H", ram: "32GB", storage: "1TB", price: 55990000, stock: 7 },
    ],
    specs: {
      "Màn hình": "15.6 inch OLED 3.5K",
      "CPU": "Intel Core i7-13700H",
      "RAM": "16GB DDR5",
      "GPU": "NVIDIA RTX 4060",
      "Bộ nhớ": "512GB SSD",
      "OS": "Windows 11 Home",
    },
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    slug: "airpods-pro-2",
    categoryId: 4,
    brand: "Apple",
    basePrice: 6990000,
    description:
      "AirPods Pro thế hệ 2 với chip H2, chống ồn chủ động thế hệ mới, âm thanh Adaptive Audio và hộp sạc MagSafe.",
    thumbnail: "https://placehold.co/400x400?text=AirPods+Pro+2",
    images: ["https://placehold.co/800x800?text=AirPods+Pro+2"],
    featured: true,
    rating: 4.8,
    reviewCount: 210,
    stock: 80,
    variants: [
      { id: 501, label: "Trắng - USB-C", color: "Trắng", connector: "USB-C", price: 6990000, stock: 50 },
      { id: 502, label: "Trắng - Lightning", color: "Trắng", connector: "Lightning", price: 6490000, stock: 30 },
    ],
    specs: {
      "Chip": "H2",
      "Chống ồn": "ANC thế hệ 2",
      "Thời gian dùng": "6 giờ (30 giờ với hộp sạc)",
      "Kết nối": "Bluetooth 5.3",
      "Chống nước": "IPX4",
    },
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    categoryId: 4,
    brand: "Sony",
    basePrice: 8490000,
    description:
      "Sony WH-1000XM5 với chống ồn hàng đầu thế giới, âm thanh Hi-Res Audio, 30 giờ pin và thiết kế thoải mái.",
    thumbnail: "https://placehold.co/400x400?text=Sony+WH-1000XM5",
    images: ["https://placehold.co/800x800?text=Sony+WH-1000XM5"],
    featured: false,
    rating: 4.7,
    reviewCount: 183,
    stock: 60,
    variants: [
      { id: 601, label: "Đen", color: "Đen", price: 8490000, stock: 30 },
      { id: 602, label: "Bạc", color: "Bạc", price: 8490000, stock: 30 },
    ],
    specs: {
      "Driver": "30mm",
      "Tần số": "4Hz - 40,000Hz",
      "Pin": "30 giờ",
      "Kết nối": "Bluetooth 5.2, NFC",
      "Trọng lượng": "250g",
    },
  },
  {
    id: 7,
    name: "Apple Watch Series 9 45mm",
    slug: "apple-watch-series-9-45mm",
    categoryId: 5,
    brand: "Apple",
    basePrice: 11990000,
    description:
      "Apple Watch Series 9 với chip S9, màn hình Always-On Retina, Double Tap gesture và theo dõi sức khỏe toàn diện.",
    thumbnail: "https://placehold.co/400x400?text=Apple+Watch+S9",
    images: ["https://placehold.co/800x800?text=Apple+Watch+S9"],
    featured: true,
    rating: 4.6,
    reviewCount: 87,
    stock: 40,
    variants: [
      { id: 701, label: "45mm - Nhôm Đen/Dây Sport - Đen", size: "45mm", material: "Nhôm", color: "Đen", price: 11990000, stock: 15 },
      { id: 702, label: "45mm - Nhôm Bạc/Dây Sport - Xanh Storm", size: "45mm", material: "Nhôm", color: "Bạc", price: 11990000, stock: 12 },
      { id: 703, label: "45mm - Thép/Dây Milanese", size: "45mm", material: "Thép không gỉ", color: "Vàng", price: 17990000, stock: 8 },
    ],
    specs: {
      "Màn hình": "45mm Always-On Retina LTPO OLED",
      "Chip": "S9 SiP",
      "Chống nước": "WR50",
      "Pin": "Đến 18 giờ",
      "OS": "watchOS 10",
    },
  },
  {
    id: 8,
    name: "iPad Pro 12.9 inch M2",
    slug: "ipad-pro-129-m2",
    categoryId: 3,
    brand: "Apple",
    basePrice: 28990000,
    description:
      "iPad Pro 12.9 inch với chip M2, màn hình Liquid Retina XDR mini-LED, kết nối Thunderbolt và Apple Pencil Pro.",
    thumbnail: "https://placehold.co/400x400?text=iPad+Pro+12.9",
    images: ["https://placehold.co/800x800?text=iPad+Pro+12.9"],
    featured: false,
    rating: 4.8,
    reviewCount: 55,
    stock: 25,
    variants: [
      { id: 801, label: "128GB WiFi - Bạc", storage: "128GB", connectivity: "WiFi", color: "Bạc", price: 28990000, stock: 10 },
      { id: 802, label: "256GB WiFi+5G - Xám không gian", storage: "256GB", connectivity: "WiFi+5G", color: "Xám không gian", price: 35990000, stock: 8 },
      { id: 803, label: "1TB WiFi - Bạc", storage: "1TB", connectivity: "WiFi", color: "Bạc", price: 49990000, stock: 7 },
    ],
    specs: {
      "Màn hình": "12.9 inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "RAM": "8GB",
      "Camera": "12MP Wide + 10MP Ultra Wide",
      "Kết nối": "Thunderbolt / USB 4",
    },
  },
  {
    id: 9,
    name: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    categoryId: 8,
    brand: "Logitech",
    basePrice: 2490000,
    description:
      "Chuột không dây Logitech MX Master 3S với cuộn MagSpeed, 8000 DPI, pin 70 ngày và kết nối đa thiết bị.",
    thumbnail: "https://placehold.co/400x400?text=MX+Master+3S",
    images: ["https://placehold.co/800x800?text=MX+Master+3S"],
    featured: false,
    rating: 4.7,
    reviewCount: 342,
    stock: 100,
    variants: [
      { id: 901, label: "Đen", color: "Đen", price: 2490000, stock: 60 },
      { id: 902, label: "Trắng", color: "Trắng", price: 2490000, stock: 40 },
    ],
    specs: {
      "DPI": "200 - 8000 DPI",
      "Pin": "Đến 70 ngày",
      "Kết nối": "Bluetooth, USB Receiver",
      "Số nút": "7 nút có thể lập trình",
      "Trọng lượng": "141g",
    },
  },
  {
    id: 10,
    name: "LG UltraWide 34WN80C",
    slug: "lg-ultrawide-34wn80c",
    categoryId: 7,
    brand: "LG",
    basePrice: 12990000,
    description:
      "Màn hình LG UltraWide 34 inch IPS, độ phân giải WQHD 3440x1440, cổng USB-C 96W và HDR10.",
    thumbnail: "https://placehold.co/400x400?text=LG+UltraWide+34",
    images: ["https://placehold.co/800x800?text=LG+UltraWide+34"],
    featured: false,
    rating: 4.5,
    reviewCount: 67,
    stock: 20,
    variants: [
      { id: 1001, label: "34 inch WQHD", size: "34 inch", price: 12990000, stock: 20 },
    ],
    specs: {
      "Kích thước": "34 inch",
      "Độ phân giải": "3440 x 1440 (WQHD)",
      "Tấm nền": "IPS",
      "Tần số quét": "60Hz",
      "Cổng kết nối": "USB-C 96W, HDMI x2, DisplayPort",
    },
  },
];

// ==================== CUSTOMERS ====================
export const customers = [
  { id: 1, name: "Nguyễn Văn An", email: "nguyenvanan@gmail.com", phone: "0901234567", address: "123 Nguyễn Huệ, Q1, TP.HCM", joinDate: "2023-03-15", totalOrders: 8, totalSpent: 45600000, status: "active", avatar: "https://placehold.co/60x60?text=NA" },
  { id: 2, name: "Trần Thị Bích", email: "tranthibich@gmail.com", phone: "0912345678", address: "456 Lê Lợi, Q5, TP.HCM", joinDate: "2023-06-20", totalOrders: 5, totalSpent: 28900000, status: "active", avatar: "https://placehold.co/60x60?text=TB" },
  { id: 3, name: "Lê Minh Cường", email: "leminhcuong@gmail.com", phone: "0923456789", address: "789 Trần Hưng Đạo, Q3, TP.HCM", joinDate: "2023-09-10", totalOrders: 12, totalSpent: 67800000, status: "active", avatar: "https://placehold.co/60x60?text=LC" },
  { id: 4, name: "Phạm Thu Dung", email: "phamthudung@gmail.com", phone: "0934567890", address: "321 Điện Biên Phủ, Bình Thạnh, TP.HCM", joinDate: "2024-01-05", totalOrders: 3, totalSpent: 15200000, status: "active", avatar: "https://placehold.co/60x60?text=PD" },
  { id: 5, name: "Hoàng Đức Em", email: "hoangducem@gmail.com", phone: "0945678901", address: "654 Cách Mạng Tháng 8, Q10, TP.HCM", joinDate: "2024-02-18", totalOrders: 1, totalSpent: 6990000, status: "inactive", avatar: "https://placehold.co/60x60?text=HE" },
  { id: 6, name: "Võ Thị Phương", email: "vothiphuong@gmail.com", phone: "0956789012", address: "987 Hai Bà Trưng, Q1, TP.HCM", joinDate: "2023-11-30", totalOrders: 7, totalSpent: 38500000, status: "active", avatar: "https://placehold.co/60x60?text=VP" },
];

// ==================== STAFF ====================
export const staffList = [
  { id: 1, name: "Đinh Văn Giang", email: "dinhvangiang@shop.com", phone: "0967890123", role: "Staff", department: "Kho hàng", joinDate: "2022-05-10", status: "active", avatar: "https://placehold.co/60x60?text=DG" },
  { id: 2, name: "Ngô Thị Hà", email: "ngothiha@shop.com", phone: "0978901234", role: "Staff", department: "Chăm sóc KH", joinDate: "2022-08-15", status: "active", avatar: "https://placehold.co/60x60?text=NH" },
  { id: 3, name: "Trịnh Minh Ích", email: "trinhminhich@shop.com", phone: "0989012345", role: "Staff", department: "Vận hành", joinDate: "2023-01-20", status: "active", avatar: "https://placehold.co/60x60?text=TI" },
  { id: 4, name: "Bùi Thị Kim", email: "buithikim@shop.com", phone: "0990123456", role: "Staff", department: "Kho hàng", joinDate: "2023-07-01", status: "inactive", avatar: "https://placehold.co/60x60?text=BK" },
];

// ==================== ORDERS ====================
export const orders = [
  {
    id: "ORD-001",
    customerId: 1,
    customerName: "Nguyễn Văn An",
    customerEmail: "nguyenvanan@gmail.com",
    customerPhone: "0901234567",
    date: "2024-04-20",
    status: "delivered",
    paymentMethod: "VNPay",
    paymentStatus: "paid",
    shippingAddress: "123 Nguyễn Huệ, Q1, TP.HCM",
    items: [
      { productId: 1, variantId: 101, name: "iPhone 15 Pro Max", variant: "256GB - Đen Titan", price: 29990000, qty: 1 },
      { productId: 5, variantId: 501, name: "AirPods Pro 2", variant: "Trắng - USB-C", price: 6990000, qty: 1 },
    ],
    subtotal: 36980000,
    discount: 1000000,
    shippingFee: 0,
    total: 35980000,
    couponCode: "SALE10",
    notes: "",
    timeline: [
      { status: "pending", time: "2024-04-20 10:00", note: "Đơn hàng được tạo" },
      { status: "confirmed", time: "2024-04-20 10:30", note: "Đơn hàng đã xác nhận" },
      { status: "shipping", time: "2024-04-21 08:00", note: "Đang giao hàng" },
      { status: "delivered", time: "2024-04-22 14:30", note: "Giao hàng thành công" },
    ],
  },
  {
    id: "ORD-002",
    customerId: 3,
    customerName: "Lê Minh Cường",
    customerEmail: "leminhcuong@gmail.com",
    customerPhone: "0923456789",
    date: "2024-04-22",
    status: "shipping",
    paymentMethod: "COD",
    paymentStatus: "unpaid",
    shippingAddress: "789 Trần Hưng Đạo, Q3, TP.HCM",
    items: [
      { productId: 3, variantId: 301, name: "MacBook Pro 14 inch M3 Pro", variant: "M3 Pro 18GB/512GB - Đen vũ trụ", price: 49990000, qty: 1 },
    ],
    subtotal: 49990000,
    discount: 0,
    shippingFee: 30000,
    total: 50020000,
    couponCode: null,
    notes: "Giao giờ hành chính",
    timeline: [
      { status: "pending", time: "2024-04-22 09:00", note: "Đơn hàng được tạo" },
      { status: "confirmed", time: "2024-04-22 09:45", note: "Đã xác nhận" },
      { status: "shipping", time: "2024-04-23 07:30", note: "Đang giao hàng" },
    ],
  },
  {
    id: "ORD-003",
    customerId: 2,
    customerName: "Trần Thị Bích",
    customerEmail: "tranthibich@gmail.com",
    customerPhone: "0912345678",
    date: "2024-04-23",
    status: "confirmed",
    paymentMethod: "Momo",
    paymentStatus: "paid",
    shippingAddress: "456 Lê Lợi, Q5, TP.HCM",
    items: [
      { productId: 6, variantId: 601, name: "Sony WH-1000XM5", variant: "Đen", price: 8490000, qty: 1 },
      { productId: 9, variantId: 901, name: "Logitech MX Master 3S", variant: "Đen", price: 2490000, qty: 1 },
    ],
    subtotal: 10980000,
    discount: 500000,
    shippingFee: 30000,
    total: 10510000,
    couponCode: "FREESHIP",
    notes: "",
    timeline: [
      { status: "pending", time: "2024-04-23 14:00", note: "Đơn hàng được tạo" },
      { status: "confirmed", time: "2024-04-23 14:30", note: "Đã xác nhận" },
    ],
  },
  {
    id: "ORD-004",
    customerId: 4,
    customerName: "Phạm Thu Dung",
    customerEmail: "phamthudung@gmail.com",
    customerPhone: "0934567890",
    date: "2024-04-24",
    status: "pending",
    paymentMethod: "VNPay",
    paymentStatus: "paid",
    shippingAddress: "321 Điện Biên Phủ, Bình Thạnh, TP.HCM",
    items: [
      { productId: 7, variantId: 701, name: "Apple Watch Series 9 45mm", variant: "45mm - Nhôm Đen/Dây Sport - Đen", price: 11990000, qty: 1 },
    ],
    subtotal: 11990000,
    discount: 0,
    shippingFee: 0,
    total: 11990000,
    couponCode: null,
    notes: "",
    timeline: [
      { status: "pending", time: "2024-04-24 16:00", note: "Đơn hàng được tạo" },
    ],
  },
  {
    id: "ORD-005",
    customerId: 6,
    customerName: "Võ Thị Phương",
    customerEmail: "vothiphuong@gmail.com",
    customerPhone: "0956789012",
    date: "2024-04-15",
    status: "cancelled",
    paymentMethod: "COD",
    paymentStatus: "unpaid",
    shippingAddress: "987 Hai Bà Trưng, Q1, TP.HCM",
    items: [
      { productId: 2, variantId: 201, name: "Samsung Galaxy S24 Ultra", variant: "256GB - Đen", price: 31990000, qty: 1 },
    ],
    subtotal: 31990000,
    discount: 0,
    shippingFee: 30000,
    total: 32020000,
    couponCode: null,
    notes: "Khách hủy do đổi ý",
    timeline: [
      { status: "pending", time: "2024-04-15 11:00", note: "Đơn hàng được tạo" },
      { status: "cancelled", time: "2024-04-15 11:30", note: "Khách hủy đơn" },
    ],
  },
];

// ==================== PROMOTIONS (COUPONS) ====================
export const promotions = [
  { id: 1, code: "SALE10", type: "percent", value: 10, minOrderValue: 5000000, maxDiscount: 1000000, usageLimit: 100, usedCount: 42, startDate: "2024-04-01", endDate: "2024-04-30", status: "active", description: "Giảm 10% tối đa 1 triệu cho đơn từ 5 triệu" },
  { id: 2, code: "FREESHIP", type: "fixed", value: 30000, minOrderValue: 500000, maxDiscount: 30000, usageLimit: 200, usedCount: 87, startDate: "2024-04-01", endDate: "2024-05-31", status: "active", description: "Miễn phí vận chuyển cho đơn từ 500k" },
  { id: 3, code: "WELCOME50", type: "fixed", value: 50000, minOrderValue: 200000, maxDiscount: 50000, usageLimit: 500, usedCount: 120, startDate: "2024-01-01", endDate: "2024-12-31", status: "active", description: "Giảm 50k cho khách hàng mới" },
  { id: 4, code: "SUMMER20", type: "percent", value: 20, minOrderValue: 10000000, maxDiscount: 2000000, usageLimit: 50, usedCount: 50, startDate: "2024-03-01", endDate: "2024-03-31", status: "expired", description: "Giảm 20% mùa hè" },
  { id: 5, code: "VIP15", type: "percent", value: 15, minOrderValue: 20000000, maxDiscount: 3000000, usageLimit: 30, usedCount: 5, startDate: "2024-05-01", endDate: "2024-05-31", status: "upcoming", description: "Ưu đãi khách VIP giảm 15%" },
];

// ==================== REVIEWS ====================
export const reviews = [
  { id: 1, productId: 1, customerId: 1, customerName: "Nguyễn Văn An", rating: 5, comment: "Máy chất lượng tuyệt vời, camera cực đỉnh, pin trâu hơn mong đợi. Rất hài lòng!", date: "2024-04-22", verified: true },
  { id: 2, productId: 1, customerId: 3, customerName: "Lê Minh Cường", rating: 4, comment: "Sản phẩm tốt, đóng gói cẩn thận. Chỉ tiếc giá hơi cao nhưng xứng đáng.", date: "2024-04-10", verified: true },
  { id: 3, productId: 5, customerId: 2, customerName: "Trần Thị Bích", rating: 5, comment: "Tai nghe AirPods Pro 2 chống ồn tốt hơn thế hệ trước rất nhiều. Xuất sắc!", date: "2024-03-15", verified: true },
  { id: 4, productId: 3, customerId: 6, customerName: "Võ Thị Phương", rating: 5, comment: "MacBook M3 Pro quá mượt, làm việc cả ngày không nóng, pin ổn định.", date: "2024-04-01", verified: true },
  { id: 5, productId: 6, customerId: 4, customerName: "Phạm Thu Dung", rating: 4, comment: "Sony XM5 âm thanh tuyệt vời, chống ồn tốt. Thiết kế đẹp hơn XM4.", date: "2024-04-05", verified: true },
];

// ==================== SUPPORT TICKETS ====================
export const supportTickets = [
  { id: 1, customerId: 1, customerName: "Nguyễn Văn An", orderId: "ORD-001", subject: "Hỏi về bảo hành sản phẩm", message: "Cho tôi hỏi iPhone 15 Pro Max mua ở đây được bảo hành bao lâu và bảo hành ở đâu?", status: "resolved", priority: "medium", createdAt: "2024-04-22 10:00", resolvedAt: "2024-04-22 14:00", assignedTo: "Ngô Thị Hà", response: "Sản phẩm được bảo hành 12 tháng tại các trung tâm Apple uỷ quyền trên toàn quốc." },
  { id: 2, customerId: 3, customerName: "Lê Minh Cường", orderId: "ORD-002", subject: "Đơn hàng giao lâu", message: "Tôi đặt hàng 2 ngày rồi mà vẫn chưa nhận được. Khi nào nhận được vậy?", status: "in_progress", priority: "high", createdAt: "2024-04-24 09:00", resolvedAt: null, assignedTo: "Ngô Thị Hà", response: null },
  { id: 3, customerId: 2, customerName: "Trần Thị Bích", orderId: null, subject: "Hỏi về mã giảm giá", message: "Mã SALE10 của tôi bị báo hết hạn dù chưa đến ngày 30/4?", status: "open", priority: "low", createdAt: "2024-04-25 15:00", resolvedAt: null, assignedTo: null, response: null },
];

// ==================== PAYMENT METHODS ====================
export const paymentMethods = [
  { id: 1, name: "Thanh toán khi nhận hàng (COD)", code: "COD", icon: "💵", enabled: true, description: "Thanh toán bằng tiền mặt khi nhận hàng" },
  { id: 2, name: "VNPay", code: "VNPAY", icon: "🏦", enabled: true, description: "Thanh toán qua cổng VNPay (ATM, Visa, Master)" },
  { id: 3, name: "MoMo", code: "MOMO", icon: "📱", enabled: true, description: "Thanh toán qua ví điện tử MoMo" },
  { id: 4, name: "ZaloPay", code: "ZALOPAY", icon: "💳", enabled: false, description: "Thanh toán qua ví điện tử ZaloPay" },
  { id: 5, name: "Chuyển khoản ngân hàng", code: "BANK_TRANSFER", icon: "🏧", enabled: true, description: "Chuyển khoản trực tiếp qua tài khoản ngân hàng" },
];

// ==================== REPORTS / ANALYTICS ====================
export const revenueByMonth = [
  { month: "T1/2024", revenue: 185000000, orders: 42, customers: 38 },
  { month: "T2/2024", revenue: 142000000, orders: 35, customers: 28 },
  { month: "T3/2024", revenue: 210000000, orders: 51, customers: 45 },
  { month: "T4/2024", revenue: 267000000, orders: 63, customers: 55 },
];

export const dashboardStats = {
  totalRevenue: 804000000,
  totalOrders: 191,
  totalCustomers: 6,
  totalProducts: 10,
  revenueGrowth: +12.5,
  ordersGrowth: +8.3,
  customersGrowth: +15.2,
  recentOrders: orders.slice(0, 5),
  topProducts: [
    { productId: 1, name: "iPhone 15 Pro Max", sold: 28, revenue: 839720000 },
    { productId: 3, name: "MacBook Pro 14 M3 Pro", sold: 12, revenue: 599880000 },
    { productId: 5, name: "AirPods Pro 2", sold: 45, revenue: 314550000 },
    { productId: 2, name: "Samsung Galaxy S24 Ultra", sold: 10, revenue: 319900000 },
    { productId: 7, name: "Apple Watch Series 9", sold: 18, revenue: 215820000 },
  ],
};

// ==================== USERS (Auth) ====================
export const users = [
  { id: 1, name: "Admin Shop", email: "admin@shop.com", password: "admin123", role: "admin", avatar: "https://placehold.co/60x60?text=AD" },
  { id: 2, name: "Đinh Văn Giang", email: "dinhvangiang@shop.com", password: "staff123", role: "staff", avatar: "https://placehold.co/60x60?text=DG" },
  { id: 3, name: "Nguyễn Văn An", email: "nguyenvanan@gmail.com", password: "customer123", role: "customer", avatar: "https://placehold.co/60x60?text=NA" },
];

// ==================== HELPERS ====================
export const ORDER_STATUS_LABEL = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

export const ORDER_STATUS_COLOR = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  shipping: "#8b5cf6",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

export const PROMOTION_STATUS_LABEL = {
  active: "Đang hoạt động",
  expired: "Hết hạn",
  upcoming: "Sắp diễn ra",
};

export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductsByCategory = (categoryId) => products.filter((p) => p.categoryId === categoryId);
export const getCategoryById = (id) => categories.find((c) => c.id === id);
export const getOrderById = (id) => orders.find((o) => o.id === id);
export const getCustomerById = (id) => customers.find((c) => c.id === id);
export const getReviewsByProduct = (productId) => reviews.filter((r) => r.productId === productId);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
