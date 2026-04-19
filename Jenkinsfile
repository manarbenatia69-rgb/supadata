pipeline {
    agent any

    environment {
        // الـ Registry متاعك أو اسم الـ Image (اختياري)
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                // سحب الكود من GitHub
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('supadata') { // يدخل لمجلد الـ Spring Boot
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                script {
                    // الكومند هذي باش تعمل Build للـ Dockerfiles الكل (Admin, Frontend, Backend)
                    // وتشعلهم الكل مع الـ Database
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Verify Containers') {
            steps {
                // باش تتأكدي إنو الـ 4 Containers يخدموا
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Project Deployed Successfully! Admin on 4201, Frontend on 4200'
        }
        failure {
            echo 'Deployment Failed. Check the logs.'
        }
    }
}