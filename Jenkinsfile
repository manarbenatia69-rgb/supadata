pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // يجبد الكود من GitHub
                checkout scm
            }
        }
        
        stage('Build & Deploy') {
            steps {
                script {
                    // نخدمو الـ Maven والـ Docker بـ "bat" متاع الويندوز طول
                    // هكا ما نستحقوش Permissions وسط Jenkins
                    bat 'mvn -f supadata/pom.xml clean package -DskipTests'
                    bat 'docker-compose down'
                    bat 'docker-compose up -d --build'
                }
            }
        }
    }
}