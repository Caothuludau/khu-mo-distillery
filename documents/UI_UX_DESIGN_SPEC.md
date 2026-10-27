# Rượu Khu Mỏ — Tài liệu UI/UX

Tài liệu nguồn cho đợt thiết kế lại website (tháng 10/2026). Thay thế định hướng
"dark industrial" trong `UI_UX_BRAND.md` về màu sắc, typography và cấu trúc trang.

---

## 1. User Research & User Needs

### Persona A · Người mua để sử dụng hằng ngày — *Ưu tiên cao*

- **Mục tiêu:** tìm loại rượu phù hợp khẩu vị, ngân sách và dịp sử dụng.
- **Cần biết:** giá, dung tích, nồng độ cồn, thành phần, nguồn gốc.
- **Hành vi:** dùng điện thoại, xem ảnh, tìm số điện thoại hoặc điểm bán.
- **Rào cản:** thông tin thiếu rõ ràng, không biết mua ở đâu.

### Persona B · Người mua biếu tặng, tiếp khách

- **Mục tiêu:** chọn sản phẩm trông chỉn chu, thể hiện sự trân trọng.
- **Cần biết:** bao bì, câu chuyện thương hiệu, hộp quà, khả năng giao hàng.
- **Hành vi:** so sánh sản phẩm và xem ảnh chi tiết trước khi liên hệ.
- **Rào cản:** không rõ cách đóng gói, chính sách giao hàng và tính xác thực.

### Persona C · Người đặt rượu cho tiệc

- **Mục tiêu:** đặt số lượng phù hợp cho cưới hỏi, liên hoan, lễ tết hoặc sự kiện.
- **Cần biết:** quy cách đóng gói, số lượng, giá theo đơn, thời gian và phạm vi giao.
- **Hành vi:** liên hệ trực tiếp để trao đổi đơn hàng.
- **Rào cản:** không biết mua số lượng lớn ở đâu, mất bao lâu để nhận.

### Persona D · Đại lý và đối tác kinh doanh

- **Mục tiêu:** xác minh thương hiệu, tìm danh mục sản phẩm và đầu mối hợp tác.
- **Cần biết:** thông tin doanh nghiệp, hồ sơ sản phẩm, chính sách phân phối.
- **Hành vi:** xem nhiều sản phẩm, chủ động gọi hoặc gửi yêu cầu hợp tác.
- **Rào cản:** thiếu thông tin doanh nghiệp, tài liệu và quy trình liên hệ.

### Persona E · Người khám phá thương hiệu

- **Mục tiêu:** hiểu Rượu Khu Mỏ là thương hiệu gì, sản phẩm nào phù hợp nhu cầu.
- **Cần biết:** câu chuyện, nguồn gốc, dòng sản phẩm, cách mua.
- **Hành vi:** đến từ tìm kiếm, mạng xã hội, quảng cáo đối tác hoặc mã QR trên bao bì.
- **Rào cản:** website thiếu thông tin, hình ảnh không rõ hoặc khó điều hướng.

> Website chỉ nên phục vụ người dùng đủ tuổi theo quy định áp dụng. Việc xác định
> đối tượng mục tiêu là người trưởng thành không đồng nghĩa mọi hình thức quảng
> cáo rượu đều được phép.

---

## 2. Information Architecture (IA)

### 2.1. Sitemap đề xuất

- **Age Gate** — xác nhận đủ tuổi trước khi truy cập
- **Homepage** — Hero · Sản phẩm nổi bật · Danh mục · Câu chuyện · Điểm bán
- **Sản phẩm**
  - Danh mục sản phẩm
  - Chi tiết sản phẩm
  - Quy cách đóng gói
- **Thương hiệu**
  - Câu chuyện Khu Mỏ
  - Nguồn gốc và quy trình
  - Tin tức, hoạt động
- **Mua hàng**
  - Hệ thống điểm bán
  - Thông tin giao hàng
  - Liên hệ đặt hàng
- **Đối tác**
  - Giới thiệu doanh nghiệp
  - Hợp tác phân phối
  - Gửi yêu cầu hợp tác
- **Footer · Thông tin pháp lý** — Điều khoản · Quyền riêng tư · Cookie · Chính
  sách giao nhận và đổi trả áp dụng

#### Cấu trúc menu chính

Desktop: **KHU MỎ** · Trang chủ · Sản phẩm · Câu chuyện · Điểm bán · Đối tác

Trên mobile, chuyển thành logo, nút mở menu và biểu tượng tìm kiếm. Không cố
nhét tất cả mục menu lên một hàng nhỏ.

### 2.2. Phân loại sản phẩm

Các nhóm cũ ("rượu ngâm, rượu thường, rượu nhẹ, rượu phục vụ tiệc") không cùng
một tiêu chí: "ngâm" mô tả cách làm, "nhẹ" mô tả đặc tính, "phục vụ tiệc" mô tả
mục đích sử dụng. Tách thành hai lớp:

- **Danh mục chính:** Rượu truyền thống, Rượu ngâm, Dòng sản phẩm khác.
- **Bộ lọc:** loại sản phẩm, dung tích, quy cách đóng gói, khoảng giá và đặc
  tính đã được xác minh.

Một sản phẩm nằm trong một danh mục chính nhưng vẫn được tìm bằng nhiều bộ lọc.

Ví dụ bộ lọc trang sản phẩm:

| Nhóm lọc | Lựa chọn |
| --- | --- |
| Danh mục | Rượu nếp · Rượu ngâm · Khác |
| Dung tích | 300 ml · 500 ml · 800 ml · Can lớn |
| Quy cách | Chai lẻ · Pack · Can |

Chỉ hiển thị lựa chọn thực sự có hàng. Không cho người dùng lọc ra một kết quả
rỗng chỉ vì một lựa chọn không tồn tại ở dòng sản phẩm nào.

### 2.3. Age Gate và Cookie Consent

#### Age Gate

- Hiển thị trước nội dung website nếu cần thiết theo yêu cầu pháp lý và chính
  sách thương hiệu.
- Nội dung ngắn, trung tính, nêu rõ yêu cầu về độ tuổi.
- Hai hành động rõ ràng: xác nhận đủ tuổi và rời website.
- Nếu người dùng chưa đủ tuổi, không cho truy cập nội dung bị giới hạn.
- Không dùng một hộp xác nhận độ tuổi như bằng chứng rằng website đã tuân thủ
  đầy đủ quy định về rượu.

#### Cookie Consent

Không bắt người dùng đối mặt với hai cửa sổ lớn liên tiếp. Sau Age Gate, hiển
thị một thanh hoặc hộp thoại nhỏ hơn để thông báo về cookie.

- Cookie thiết yếu: giải thích vai trò và xử lý theo quy định áp dụng.
- Cookie phân tích, quảng cáo: chỉ kích hoạt theo cơ chế đồng ý phù hợp khi
  pháp luật yêu cầu.
- Có tùy chọn chấp nhận, từ chối cookie không thiết yếu và xem chi tiết.
- Cho phép thay đổi lựa chọn sau này.

> **Lưu ý pháp lý:** trước khi phát hành, cần kiểm tra quy định Việt Nam về
> quảng cáo và kinh doanh rượu theo nồng độ cồn của từng sản phẩm. Một số hình
> thức quảng cáo rượu bị hạn chế hoặc cấm, nên ảnh sản phẩm, nội dung quảng bá
> và lời kêu gọi mua hàng cần được rà soát pháp lý trước khi công khai. Điều
> khoản bán hàng, bảo vệ dữ liệu cá nhân, giao hàng và đổi trả cần được xây dựng
> theo pháp luật Việt Nam, không sao chép điều khoản mẫu từ website Anh hoặc Mỹ.

---

## 3. User Flow & Interaction Design

Website đơn giản về số trang, nhưng luồng mua hàng vẫn có những tình huống phải
xử lý, đặc biệt khi người dùng cần tư vấn trực tiếp thay vì checkout online.

### 3.1. Ba luồng người dùng quan trọng nhất

**Flow A · Tìm sản phẩm và hỏi mua**

Truy cập website → Age Gate → Homepage → Tìm kiếm hoặc chọn danh mục → Xem
Product Details → Chọn hành động: Xem điểm bán · Gọi điện · Gửi yêu cầu mua hàng

**Flow B · Đặt hàng số lượng lớn**

Homepage / Product Details → Chọn quy cách và số lượng dự kiến → Gửi yêu cầu tư
vấn → Nhận xác nhận về giá, tồn kho, giao hàng → Hoàn tất đơn hàng qua kênh bán
hàng hợp lệ

**Flow C · Tìm đại lý hoặc hợp tác**

Homepage → Đối tác → Xem thông tin doanh nghiệp và chính sách phù hợp → Điền form
liên hệ đối tác → Thông báo gửi thành công → Đầu mối phụ trách tiếp nhận

### 3.2. Wireframe trang chủ

```
┌───────────────────────────────────────────────────────────┐
│ KHU MỎ                RƯỢU · VĂN HÓA · VÙNG MỎ             │
├───────────────────────────────────────────────────────────┤
│ HERO                                                      │
│ Tinh thần vùng mỏ.                                        │
│ Dấu ấn trong từng giọt rượu.                              │
│ Câu chuyện thương hiệu, nguồn gốc và các dòng sản phẩm    │
│ được giới thiệu bằng nội dung đã xác thực.                │
│ [Khám phá thương hiệu]     Ảnh: sản phẩm + bối cảnh mỏ    │
├───────────────────────────────────────────────────────────┤
│ CÁC DÒNG SẢN PHẨM                                         │
│ ┌ RƯỢU NẾP ─────────────┐  ┌ RƯỢU MƠ ──────────────────┐  │
│ │ Rượu nếp nhiệt đới    │  │ Rượu mơ ngâm đường phèn   │  │
│ │ Xanh navy · Trắng     │  │ Đỏ mận · Vàng kim         │  │
│ │ Xem sản phẩm →        │  │ Xem sản phẩm →            │  │
│ └───────────────────────┘  └───────────────────────────┘  │
├───────────────────────────────────────────────────────────┤
│ VỀ RƯỢU KHU MỎ — câu chuyện, nguồn gốc, giá trị  [Ảnh]    │
├───────────────────────────────────────────────────────────┤
│ TÌM ĐIỂM BÁN VÀ THÔNG TIN LIÊN HỆ                         │
│ Địa chỉ · Điện thoại · Kênh liên hệ đối tác               │
├───────────────────────────────────────────────────────────┤
│ RƯỢU KHU MỎ — Thông tin doanh nghiệp · Chính sách ·       │
│ Quyền riêng tư                                            │
└───────────────────────────────────────────────────────────┘
```

Wireframe minh họa cấu trúc, không phải giao diện hoàn thiện. Khi thiết kế thật
dùng ảnh sản phẩm do thương hiệu cung cấp.

Thứ tự trang chủ:

1. Header và điều hướng.
2. Hero giới thiệu thương hiệu.
3. Các dòng sản phẩm tiêu biểu.
4. Câu chuyện thương hiệu và vùng mỏ.
5. Thông tin về chất lượng, nguồn gốc và quy trình đã được xác minh.
6. Hệ thống điểm bán, kênh liên hệ.
7. Footer và thông tin pháp lý.

Không cần banner khuyến mãi, đồng hồ đếm ngược hay popup giảm giá. Với website
thương hiệu, càng nhiều yếu tố tranh giành sự chú ý thì thông điệp chính càng dễ
bị chôn vùi. Nội dung quảng bá rượu cần được kiểm tra tính hợp pháp trước khi
sử dụng.

---

## 4. Visual Design & Design System

### 4.1. Định hướng nghệ thuật

**Concept: Industrial Heritage × Contemporary Craft**

- **Industrial Heritage:** di sản công nghiệp, vùng mỏ, kết cấu kim loại, lịch
  sử lao động.
- **Contemporary Craft:** sản phẩm được trình bày chỉn chu, hình ảnh chất lượng,
  typography hiện đại và bố cục thoáng.

Văn hóa vùng mỏ là nguồn cảm hứng, không phải lý do để mọi thành phần trông như
bảng cảnh báo công trường.

| Nhánh | Hình ảnh |
| --- | --- |
| Thương hiệu | Ảnh tư liệu, đường nét công nghiệp, xanh navy, chất liệu kim loại |
| Sản phẩm | Ảnh chai sắc nét, ánh sáng có kiểm soát, nền sạch, tập trung vào bao bì |

### 4.2. Typography

| Font | Vai trò | Ghi chú |
| --- | --- | --- |
| **Be Vietnam Pro** (mặc định) | Nội dung, menu, nút | Hỗ trợ tiếng Việt tốt. Regular cho nội dung, Medium cho menu, SemiBold cho tiêu đề |
| Manrope (thay thế) | Tiêu đề hiện đại | Cần kiểm tra đủ bộ ký tự tiếng Việt |

| Thành phần | Kích thước | Độ đậm |
| --- | --- | --- |
| H1 desktop | 44–56 px | 700 |
| H1 mobile | 32–38 px | 700 |
| H2 | 28–36 px | 600–700 |
| H3 | 20–24 px | 600 |
| Body | 16–18 px | 400 |
| Caption | 13–14 px | 400 |
| Button | 15–16 px | 600 |

Kiểm tra trên thiết bị thật, đặc biệt với dấu tiếng Việt và tiêu đề dài.

### 4.3. Hệ thống màu sắc

**A. Brand palette**

| Tên | Mã | Dùng cho |
| --- | --- | --- |
| Mine Navy | `#152844` | Header, footer, tiêu đề lớn |
| Warm Ivory | `#F4F0E8` | Nền trang, vùng nội dung |
| Coal Black | `#272727` | Văn bản chính, chi tiết |
| Mineral Gold | `#B89452` | Điểm nhấn, đường viền, họa tiết |

**B. Product palettes**

| Dòng | Màu |
| --- | --- |
| Nếp nhiệt đới | Navy · Blue · White |
| Mơ ngâm đường phèn | Plum · Gold · Amber |

Các mã màu là đề xuất khởi đầu lấy cảm hứng từ ảnh, chưa phải màu thương hiệu
chính thức. Cần lấy mẫu từ bao bì gốc và kiểm tra trên màn hình thực tế.

Không dùng vàng kim cho chữ nhỏ trên nền trắng vì độ tương phản thấp.

### 4.4. Spacing, layout và grid

| Token | Giá trị | Mục đích |
| --- | --- | --- |
| `space-1` | 4 px | Khoảng cách rất nhỏ |
| `space-2` | 8 px | Trong thành phần |
| `space-3` | 12 px | Icon và text |
| `space-4` | 16 px | Padding cơ bản |
| `space-6` | 24 px | Giữa thành phần |
| `space-8` | 32 px | Khoảng cách nhóm |
| `space-12` | 48 px | Khoảng cách section |
| `space-16` | 64 px | Section lớn trên desktop |

- Desktop: container tối đa 1200–1280 px.
- Tablet: 2–3 cột sản phẩm tùy độ rộng.
- Mobile: 2 cột card nếu ảnh và tên vẫn đủ rõ; nếu không, 1 cột.
- Đoạn văn dài: giữ độ rộng đọc hợp lý.
- Ảnh sản phẩm: tỷ lệ khung thống nhất trong cùng một danh sách.

### 4.5. Component library

- **Buttons:** Primary action · Secondary action · Text link →
- **Product card:** ảnh sản phẩm · danh mục · tên · dung tích · quy cách · giá
  hoặc hướng dẫn nhận báo giá · Xem chi tiết
- **Form field:** nhãn ("Số điện thoại liên hệ"), placeholder ("Nhập số điện
  thoại"), ghi chú ("Chỉ thu thập thông tin cần thiết để xử lý yêu cầu.")
- **Feedback states:**
  - *Gửi yêu cầu thành công* — Yêu cầu đã được ghi nhận. Thông tin tiếp theo
    sẽ được gửi qua kênh liên hệ đã cung cấp.
  - *Không thể gửi yêu cầu* — Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại
    sau hoặc sử dụng kênh liên hệ được cung cấp.

Component và variants cần có:

- Button: Primary, Secondary, Disabled, Loading.
- Product card: Default, Hover, Unavailable nếu áp dụng.
- Input: Default, Focus, Error, Disabled.
- Header: Desktop, Mobile, Menu expanded.
- Modal: Default, Confirm, Error.
- Badge, Breadcrumb, Pagination, Search field, Footer.

---

## 5. Usability & Accessibility

### 5.1. Checklist kiểm thử

**Điều hướng**

- [ ] Logo đưa về trang chủ
- [ ] Menu dùng nhãn tiếng Việt dễ hiểu
- [ ] Có đường dẫn quay lại danh mục từ trang chi tiết
- [ ] Tìm kiếm có thông báo khi không có kết quả

**Sản phẩm**

- [ ] Tên và ảnh sản phẩm rõ ràng
- [ ] Dung tích và quy cách đóng gói được phân biệt
- [ ] Giá hoặc cách nhận báo giá được nêu rõ
- [ ] Thông tin nguồn gốc và nồng độ có căn cứ

**Form và thao tác**

- [ ] Có nhãn rõ ràng cho từng trường nhập
- [ ] Báo lỗi ngay tại trường liên quan
- [ ] Không mất dữ liệu khi lỗi có thể khôi phục
- [ ] Có thông báo sau khi gửi thành công

**Accessibility**

- [ ] Có thể thao tác bằng bàn phím
- [ ] Focus indicator nhìn thấy rõ
- [ ] Ảnh có alt text phù hợp
- [ ] Tương phản văn bản đạt WCAG 2.2 AA khi áp dụng
- [ ] Không truyền tải trạng thái chỉ bằng màu sắc

Lưu ý thêm:

- Không dùng placeholder làm nhãn duy nhất cho input.
- Vùng bấm khoảng 44 × 44 CSS px cho các điều khiển thường dùng.
- Không tự phát video hoặc âm thanh gây bất ngờ.
- Không dùng popup xuất hiện liên tục để ép người dùng thao tác.
- Giá, dung tích và nồng độ cồn ưu tiên độ rõ ràng hơn hiệu ứng trang trí.

---

## 6. Responsive Design

Thiết kế mobile-first cho trang danh sách và chi tiết sản phẩm.

| Thành phần | Mobile | Desktop |
| --- | --- | --- |
| Header | Logo, search, menu | Menu ngang đầy đủ |
| Hero | Ảnh và nội dung xếp dọc | Có thể chia 2 cột |
| Product listing | 1–2 cột | 3–4 cột |
| Product detail | Ảnh rồi thông tin | Gallery và thông tin cạnh nhau |
| Search | Toàn chiều rộng khi mở | Ô tìm kiếm hoặc popup |
| Footer | Các nhóm xếp dọc | Nhiều cột |
| Form liên hệ | Một cột | Chia nhóm hợp lý |

Breakpoint ban đầu: 480 px, 768 px, 1024 px — kiểm thử thêm ở các độ rộng thực tế.

### 6.1. Trang chi tiết sản phẩm

- Ảnh sản phẩm lớn: ảnh chai, nhãn và bao bì thật.
- Danh mục (vd. Rượu ngâm) · Tên (vd. Rượu mơ ngâm đường phèn).
- Dung tích: 500 ml · các quy cách khác hiển thị nếu có.
- **Thông tin sản phẩm:** mô tả, thành phần, nồng độ cồn, nguồn gốc, thông tin
  công bố phù hợp. Chỉ dùng dữ liệu đã được doanh nghiệp xác nhận.
- **Quy cách đóng gói:** Chai lẻ · Pack · Quy cách khác.
- Thông tin điểm bán / liên hệ.

Desktop: ảnh trái, thông tin phải. Mobile: ảnh phía trên. Thông tin cần thiết
hiển thị trước các đoạn kể chuyện dài.

Không hiển thị giá giao hàng, thời gian giao hoặc tồn kho như thể đã xác nhận
nếu chưa có dữ liệu thực tế.

---

## 7. Content, Feedback & Edge Cases

### 7.1. Quy tắc nội dung

| Thành phần | Nguyên tắc |
| --- | --- |
| Tên sản phẩm | Chính xác, thống nhất giữa website và bao bì |
| Mô tả | Rõ ràng, có căn cứ, tránh tuyên bố không được chứng minh |
| Giá | Nêu rõ đơn vị, quy cách và điều kiện áp dụng |
| Hình ảnh | Ảnh thật, độ phân giải cao, đúng phiên bản sản phẩm |
| Nút CTA | Động từ rõ nghĩa: "Xem chi tiết", "Liên hệ" |
| Thông báo lỗi | Nói rõ vấn đề và cách khắc phục |
| Nội dung pháp lý | Theo quy định Việt Nam, có người phụ trách rà soát |

### 7.2. Các trạng thái phải thiết kế

| Trạng thái | Cách xử lý |
| --- | --- |
| Loading | Skeleton hoặc trạng thái tải khi danh sách đang lấy dữ liệu |
| Empty state | Thông báo chưa có sản phẩm phù hợp, cho phép xóa bộ lọc |
| Search no results | Nêu rõ không tìm thấy, gợi ý kiểm tra từ khóa |
| Product unavailable | Không để người dùng hiểu nhầm là có thể mua ngay |
| Form validation | Lỗi cạnh trường nhập, giữ lại dữ liệu hợp lệ |
| Network error | Thông báo lỗi kết nối, có nút thử lại nếu phù hợp |
| Success | Xác nhận đã hoàn thành và giải thích bước tiếp theo |

### 7.3. Cookie và dữ liệu cá nhân

Nếu website có form liên hệ, cần xác định:

- Thu thập dữ liệu gì và để làm gì.
- Ai được quyền truy cập dữ liệu.
- Dữ liệu được lưu trữ và xử lý ra sao.
- Cách xử lý yêu cầu của người dùng theo quy định.
- Cookie nào là thiết yếu, cookie nào phục vụ phân tích hoặc mục đích khác.

Không cần tạo tài khoản người dùng chỉ để xem danh mục sản phẩm nếu không có nhu
cầu nghiệp vụ thực sự. Ít dữ liệu hơn thường đồng nghĩa với ít việc phải bảo vệ
hơn.

---

## 8. Performance & UX Measurement

| Mục tiêu | Chỉ số |
| --- | --- |
| Người dùng tìm được sản phẩm | Tỷ lệ tìm kiếm thành công, tỷ lệ không có kết quả |
| Người dùng hiểu thông tin | Kết quả kiểm thử tác vụ, lỗi khi tìm dung tích hoặc quy cách |
| Người dùng tìm được cách mua | Click vào kênh liên hệ, click xem điểm bán |
| Người dùng quan tâm đối tác | Lượt mở form và tỷ lệ gửi form thành công |
| Website hoạt động tốt | LCP, INP, CLS và lỗi tải tài nguyên |
| Website dễ sử dụng | Task success rate, thời gian hoàn thành tác vụ |

Core Web Vitals (phân vị 75 dữ liệu người dùng thực): LCP ≤ 2,5 s, INP ≤ 200 ms,
CLS ≤ 0,1. Đây là mục tiêu đo lường, không phải cam kết rằng đạt ba số này là UX
tốt.

Không thu thập dữ liệu cá nhân nhạy cảm hoặc theo dõi người dùng quá mức. Analytics
phải phục vụ quyết định cải tiến cụ thể.

---

## Deliverables cuối cùng

1. User personas và nhu cầu chính.
2. Sitemap và user flows.
3. Wireframe cho từng trang.
4. Design system: typography, color tokens, spacing, grid.
5. Component library và interaction states.
6. High-fidelity UI cho desktop và mobile.
7. Prototype các luồng quan trọng.
8. Checklist usability, accessibility, performance.
9. Tài liệu bàn giao cho frontend.
10. Danh sách nội dung và hạng mục pháp lý cần xác nhận.
