# # مرحله 1: ساخت
# FROM node:22 AS build

# # ت نظیم دایرکتوری کاری
# WORKDIR /app

# # کپی کردن package.json و package-lock.json و نصب وابستگی‌ها
# COPY ./package*.json ./
# RUN npm install

# # کپی کردن بقیه فایل‌های پروژه و ساخت پروژه
# COPY . .
# RUN npm run build --prod

# مرحله 1: ساخت
FROM node:22 AS build

# تنظیم دایرکتوری کاری
WORKDIR /app

# کپی کردن package.json و package-lock.json و نصب وابستگی‌ها
COPY package*.json ./
RUN npm install

# کپی کردن بقیه فایل‌های پروژه و ساخت پروژه
COPY . .
RUN npm run build --prod

# مرحله 2: سرو کردن فایل‌های استاتیک
FROM nginx:stable-alpine

# کپی کردن فایل‌های ساخته شده به دایرکتوری nginx
COPY --from=build /app/dist/edu-store-client/browser /usr/share/nginx/html

# کپی کردن فایل کانفیگ nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# اکسپوز کردن پورت
EXPOSE 80

# اجرای nginx
CMD ["nginx", "-g", "daemon off;"]