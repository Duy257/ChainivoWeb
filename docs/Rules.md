# Quy Tắc Đặt Tên và Cấu Trúc Dự Án

## 1. Quy Tắc Đặt Tên File

### 1.1 Components

- Tên component luôn viết camelCase. ví dụ: Home, ProductDetail...
- Tất cả các type để ở thư mục types

## 1.2 Quy Tắc Đặt Tên Folder

- Luôn viết thường.
  ví dụ: home, product, news...
- nếu có 2 từ trở lên
  ví dụ: home-module, product-detail-module...

## 2. Quy Tắc Component

- **Tối đa**: 350 dòng code
- **Khuyến nghị**: 200-250 dòng
- **Nếu vượt quá**: Tách thành các components nhỏ hơn

### 3. Checklist trước khi commit

- [ ] File không vượt quá giới hạn dòng quy định
- [ ] Tên file và folder tuân thủ quy tắc
- [ ] Import/export được sắp xếp đúng thứ tự
- [ ] Code có comment đầy đủ
- [ ] Không có lỗi TypeScript
- [ ] Không có unused imports

### 4 Tools hỗ trợ

- ESLint: Kiểm tra code style
- Prettier: Format code
- TypeScript: Type checking

### 5. Cấu trúc router

├── app/
│ ├── (routes)/
│ │ ├── about/
│ │ ├── page.tsx
│ │ ├── components - các file module tách ra sẽ để ở đây
│ │ ├── hooks - custom hooks để ở đây
│ │ ├── ultis - các function tách ra để ở đây
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── ui/
│ │ ├── Button.tsx
│ │ └── Card.tsx
│ ├── layout/
│ ├── Header.tsx
│ └── Footer.tsx

**Lưu ý**: Tất cả các quy tắc này nhằm đảm bảo code dễ đọc, dễ bảo trì và nhất quán trong toàn bộ dự án.
