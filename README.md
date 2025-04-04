# Todo T3 Stack

Dự án này là một ứng dụng Todo được xây dựng bằng T3 stack.

## Bắt đầu

### 1. Thiết lập file `.env`

1. Sao chép file `.env.example` để tạo file `.env` mới:
   ```bash
   cp .env.example .env
   ```
2. Điền các biến môi trường vào file `.env`. Ví dụ:
   ```properties
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
   ```

### 2. Cài đặt các thư viện

Chạy lệnh sau để cài đặt tất cả các thư viện cần thiết:
```bash
npm install
```

### 3. Đẩy schema lên cơ sở dữ liệu

Để đẩy schema của Prisma lên cơ sở dữ liệu, chạy:
```bash
npm run db.push
```

### 4. Chạy server phát triển

Khởi động server phát triển bằng lệnh:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000).
