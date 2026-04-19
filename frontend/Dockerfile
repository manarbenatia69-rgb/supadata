# Stage 1: Build (نستعملوا Node باش نصنعوا الـ files)
FROM node:18-alpine AS build
WORKDIR /app

# نصبوا الـ dependencies
COPY package*.json ./
RUN npm install

# نزيدوا الكود و نعملوا build
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve (نستعملوا Nginx باش نعرضوا الـ files)
FROM nginx:alpine

# رد بالك: بدلي 'name-of-your-app' بالاسم اللي تلقاه في الـ dist folder
COPY --from=build /app/dist/name-of-your-app /usr/share/nginx/html

# نزيدوا ملف الـ configuration متاع Nginx (اختياري لكن باهي للـ Routing)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]