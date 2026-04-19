pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build & Deploy') {
            steps {
                script {
                    // استعملنا "sh" في بلاصة "bat" خاطر Jenkins يخدم بـ Linux
                    // واستعملنا "mvn" و "docker" اللي موجودين وسط الـ Container
                    sh 'mvn -f supadata/pom.xml clean package -DskipTests'
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}