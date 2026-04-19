FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# On copie le fichier jar qu'on vient de créer
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]