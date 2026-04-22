pipeline {
    agent any 

    stages {
        stage('Initial Check') {
            steps {
                sh 'docker version'
                // نحينا node -v و mvn -v من هنا خاطر باش نستعملوهم وسط الـ Containers متاعهم
            }
        }

        // 1. بناء الـ Backend باستعمال Maven Container
        stage('Build Backend') {
            agent {
                docker { image 'maven:3.9.6-eclipse-temurin-17' }
            }
            steps {
                dir('supadata') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        // 2. بناء الـ Admin باستعمال Node Container
        stage('Build Admin') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                dir('Admin') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        // 3. بناء الـ Frontend باستعمال Node Container
        stage('Build Frontend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        // 4. الـ Deployment الـ Docker-Compose
        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}