FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.27.0
COPY --from=build /app/dist/edu-store-client/browser /usr/share/nginx/html


# ایجاد دایرکتوری برای گواهینامه‌ها
RUN mkdir -p /etc/letsencrypt/live/saelectronics.ir

# copy certificates to container from host
COPY /etc/letsencrypt/live/saelectronics.ir/fullchain.pem /etc/letsencrypt/live/saelectronics.ir/fullchain.pem
COPY /etc/letsencrypt/live/saelectronics.ir/privkey.pem /etc/letsencrypt/live/saelectronics.ir/privkey.pem

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]