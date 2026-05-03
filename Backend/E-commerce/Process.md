## 📋 Chi tiết các Task theo từng Phase

---

### Phase 1 — Project Setup & Infrastructure

| Task | Mô tả |
|------|-------|
| Cấu hình `Program.cs` | Đăng ký services: DbContext, JWT, CORS, Swagger |
| Tạo `appsettings.json` | Connection string, JWT secret, expiry |
| Cài NuGet packages | `EFCore`, `EFCore.SqlServer`, `JwtBearer`, `Swashbuckle` |
| Tạo cấu trúc thư mục | `Controllers/`, `Services/`, `DTOs/`, `Repositories/`, `Middlewares/` |
| Tạo `BaseResponse<T>` | Chuẩn hóa format response trả về cho toàn bộ API |
| Tạo `GlobalExceptionMiddleware` | Bắt và xử lý lỗi tập trung |

---

### Phase 2 — Database & Migrations

| Task | Mô tả |
|------|-------|
| Tạo `AppDbContext` | Đăng ký tất cả DbSet, cấu hình quan hệ bằng Fluent API |
| Cấu hình Fluent API | Quan hệ FK, index unique (Email, VoucherCode), decimal precision |
| Tạo Migration đầu tiên | `Add-Migration InitialCreate` |
| Seed data | Seed Role (Admin, Staff, Customer), PaymentMethod, tài khoản Admin mặc định |
| Chạy `Update-Database` | Tạo schema trên SQL Server |

---

### Phase 3 — Authentication & Authorization

> Refs: `AD-EC01`, `AD-EC02`, `CU-EC01`, `CU-EC02`, `ST-EC01`

| Task | Mô tả |
|------|-------|
| Tạo `AuthController` | Endpoint: `POST /api/auth/register`, `POST /api/auth/login` |
| `RegisterDTO` | Validate: Email unique, Password min 6 ký tự, FullName required |
| `LoginDTO` + `LoginResponseDTO` | Trả về JWT token + thông tin user |
| `JwtService` | Tạo và validate JWT token, set claims (UserId, Role) |
| Phân quyền theo Role | `[Authorize(Roles = "Admin")]`, `[Authorize(Roles = "Staff")]`, `[Authorize(Roles = "Customer")]` |
| Hash password | Dùng `BCrypt.Net` hoặc `PBKDF2` |
| `GET /api/auth/me` | Lấy thông tin user đang đăng nhập từ token |

---

### Phase 4 — Product & Category APIs

> Refs: `AD-EC03`, `AD-EC06`, `CU-EC03`

#### Category & Brand
| Task | Mô tả |
|------|-------|
| `CategoryController` | `GET /api/categories`, `POST`, `PUT /{id}`, `DELETE /{id}` |
| `BrandController` | `GET /api/brands`, `POST`, `PUT /{id}`, `DELETE /{id}` |

#### Product
| Task | Mô tả |
|------|-------|
| `ProductController` | CRUD đầy đủ |
| `GET /api/products` | Phân trang, filter theo Category, Brand, tìm kiếm theo tên |
| `GET /api/products/{id}` | Chi tiết sản phẩm kèm Variants, Images, AverageRating |
| `POST /api/products` | Tạo sản phẩm + variants + images (Admin only) |
| `PUT /api/products/{id}` | Cập nhật sản phẩm (Admin, Staff) |
| `DELETE /api/products/{id}` | Soft delete hoặc hard delete (Admin only) |

#### ProductVariant & ProductImage
| Task | Mô tả |
|------|-------|
| `POST /api/products/{id}/variants` | Thêm biến thể |
| `PUT /api/variants/{id}` | Cập nhật biến thể (tên, giá, số lượng) |
| `DELETE /api/variants/{id}` | Xóa biến thể |
| `POST /api/products/{id}/images` | Upload ảnh sản phẩm |
| `DELETE /api/images/{id}` | Xóa ảnh |

---

### Phase 5 — Cart & Order Flow

> Refs: `CU-EC04`, `CU-EC05`, `CU-EC06`, `CU-EC07`

#### Cart
| Task | Mô tả |
|------|-------|
| `GET /api/cart` | Lấy giỏ hàng của user đang đăng nhập |
| `POST /api/cart/items` | Thêm ProductVariant vào giỏ (tạo Cart nếu chưa có) |
| `PUT /api/cart/items/{id}` | Cập nhật số lượng |
| `DELETE /api/cart/items/{id}` | Xóa item khỏi giỏ |
| `DELETE /api/cart` | Xóa toàn bộ giỏ hàng |

#### Order
| Task | Mô tả |
|------|-------|
| `POST /api/orders` | Tạo đơn hàng từ giỏ hàng (kèm ShippingAddress, PaymentMethodId, VoucherId?) |
| Logic tạo đơn | Tính SubTotal, áp Voucher → DiscountAmount, tính TotalAmount |
| Trừ tồn kho | Sau khi đặt hàng thành công, giảm `Quantity` trong `ProductVariant` |
| Xóa giỏ hàng | Sau khi tạo đơn thành công |
| `GET /api/orders` | Lấy danh sách đơn hàng của Customer (phân trang) |
| `GET /api/orders/{id}` | Chi tiết đơn hàng + OrderDetails |
| `PUT /api/orders/{id}/cancel` | Customer hủy đơn (chỉ khi Status = Pending) |

---

### Phase 6 — Voucher & Payment Method

> Refs: `AD-EC07`, `AD-EC09`

| Task | Mô tả |
|------|-------|
| `GET /api/vouchers` | Danh sách voucher (Admin) |
| `POST /api/vouchers` | Tạo voucher mới (Admin) |
| `PUT /api/vouchers/{id}` | Cập nhật voucher |
| `DELETE /api/vouchers/{id}` | Xóa voucher |
| `POST /api/vouchers/validate` | Customer nhập mã → validate và trả về discount |
| `GET /api/payment-methods` | Danh sách phương thức thanh toán |
| `POST /api/payment-methods` | Thêm phương thức (Admin) |
| `PUT /api/payment-methods/{id}` | Cập nhật / bật-tắt |

---

### Phase 7 — Review & Support

> Refs: `CU-EC08`, `CU-EC09`, `ST-EC03`

#### Review
| Task | Mô tả |
|------|-------|
| `POST /api/reviews` | Customer viết đánh giá (chỉ sau khi đã mua — check OrderDetail) |
| `GET /api/products/{id}/reviews` | Lấy tất cả review của sản phẩm |
| `DELETE /api/reviews/{id}` | Admin/Staff xóa review vi phạm |
| Tính AverageRating | Sau mỗi review mới, cập nhật lại `AverageRating` trong Product |

#### SupportRequest
| Task | Mô tả |
|------|-------|
| `POST /api/support` | Customer gửi yêu cầu hỗ trợ |
| `GET /api/support` | Customer xem danh sách ticket của mình |
| `GET /api/support/all` | Staff/Admin xem tất cả ticket |
| `PUT /api/support/{id}` | Staff cập nhật Status + gán StaffId xử lý |

---

### Phase 8 — Admin & Staff Features

> Refs: `AD-EC04`, `AD-EC05`, `AD-EC08`, `AD-EC010`, `AD-EC011`, `ST-EC02`, `ST-EC04`

#### Quản lý Order (Admin & Staff)
| Task | Mô tả |
|------|-------|
| `GET /api/admin/orders` | Danh sách tất cả đơn hàng, filter theo Status |
| `PUT /api/admin/orders/{id}/status` | Cập nhật trạng thái: Pending → Processing → Shipped → Delivered |
| `PUT /api/admin/orders/{id}` | Chỉnh sửa đơn hàng (sản phẩm, số lượng) |

#### Quản lý Customer
| Task | Mô tả |
|------|-------|
| `GET /api/admin/customers` | Danh sách khách hàng, tìm kiếm, phân trang |
| `PUT /api/admin/customers/{id}` | Chỉnh sửa thông tin khách hàng |

#### Quản lý Staff (Admin only)
| Task | Mô tả |
|------|-------|
| `GET /api/admin/staff` | Danh sách nhân viên |
| `POST /api/admin/staff` | Thêm nhân viên (tạo User với Role = Staff) |
| `PUT /api/admin/staff/{id}` | Chỉnh sửa thông tin |
| `DELETE /api/admin/staff/{id}` | Xóa nhân viên |

#### Thống kê & Báo cáo (Admin only)
| Task | Mô tả |
|------|-------|
| `GET /api/admin/stats` | Tổng doanh thu, tổng đơn hàng, tổng khách hàng |
| `GET /api/admin/stats/revenue` | Doanh thu theo ngày / tháng / năm |
| `GET /api/admin/stats/top-products` | Sản phẩm bán chạy nhất |
| `GET /api/admin/reports/export` | Xuất báo cáo CSV/Excel (dùng `ClosedXML` hoặc `EPPlus`) |

#### Quản lý Kho (Staff)
| Task | Mô tả |
|------|-------|
| `GET /api/staff/inventory` | Danh sách variant + số lượng tồn kho |
| `PUT /api/staff/inventory/{variantId}` | Cập nhật số lượng tồn kho |

---

### Phase 9 — Testing & Documentation

| Task | Mô tả |
|------|-------|
| Swagger config | Thêm JWT auth vào Swagger UI (`Bearer token`) |
| Mô tả endpoint | Thêm `[ProducesResponseType]`, XML comments |
| Unit Test | Test Services/Business logic (xUnit + Moq) |
| Integration Test | Test API endpoints với in-memory DB |
| Postman Collection | Export collection để team test thủ công |

---

## 📁 Cấu trúc thư mục đề xuất
