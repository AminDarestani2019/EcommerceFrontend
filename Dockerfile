FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:1.27.0
COPY --from=build /app/dist/edu-store-client/browser /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY certbot/conf /etc/letsencrypt
COPY certbot/www /var/www/certbot
EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]