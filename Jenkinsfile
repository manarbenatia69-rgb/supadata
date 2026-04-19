pipeline {
    agent any

    environment {
        // تأكدي إن اسم الملف فيه مطة موش فراغ
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('supadata') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build & Deploy Containers') {
            steps {
                script {
                    // نزيدو الـ PATH باش الـ Jenkins يلقى الـ Docker وين ما كان مخبي
                    withEnv(['PATH+EXTRA=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {
                        // جربي الـ Compose بالـ مطة أو بلاش، الكومند هذي تجربهم الزوز
                        sh 'docker-compose up -d --build || docker compose up -d --build'
                    }
                }
            }
        }

        stage('Verify') {
            steps {
                withEnv(['PATH+EXTRA=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin']) {
                    sh 'docker ps'
                }
            }
        }
    }

    post {
        success {
            echo 'Project Deployed Successfully!'
        }
        failure {
            echo 'Deployment Failed. Still Docker not found or error in build.'
        }
    }
}