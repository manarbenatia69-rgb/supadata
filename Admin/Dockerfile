FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
# رد بالك هوني: COPY تستعمل المسار اللي لقيناه بالـ dir
COPY dist/admin /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]