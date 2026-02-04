FROM eclipse-temurin:21-jdk
ADD /backend/target/app.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar" ]
