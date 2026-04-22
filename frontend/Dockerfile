# استعمل نسخة Nginx خفيفة
FROM nginx:stable-alpine

# 1. فسخ الملفات القديمة اللي تجي par défaut مع Nginx
RUN rm -rf /usr/share/nginx/html/*

# 2. كوبي ملفات الـ build لمسار Nginx
# استعملنا dist/frontend خاطر هذا وين موجود الـ index.html متاعك
COPY dist/frontend /usr/share/nginx/html

# 3. كوبي الـ config متاع nginx (باش الـ routes يخدمو مريڨل)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 4. حل الـ port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]