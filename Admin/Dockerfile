# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# نصبوا الـ dependencies
COPY package*.json ./
RUN npm install

# نزيدوا الكود و نعملوا build
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve
FROM nginx:alpine

# المصحح: استعملنا /app/dist/admin
COPY --from=build /app/dist/admin /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]