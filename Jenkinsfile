pipeline {
    agent any 

    stages {
        stage('Initial Check') {
            steps {
                sh 'docker version'
                // نثبتو هل docker-compose موجود أو لا
                sh 'docker-compose --version || echo "docker-compose not found"'
            }
        }

        // 1. Build Backend
        stage('Build Backend') {
            agent { docker { image 'maven:3.9.6-eclipse-temurin-17' } }
            steps {
                dir('supadata') { 
                    sh 'mvn clean package -DskipTests' 
                }
            }
        }

        // 2. Build Admin
        stage('Build Admin') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                dir('Admin') { 
                    sh 'npm install'
                    sh 'npm run build --configuration=production' 
                }
            }
        }

        // 3. Build Frontend (باسم الفولدر الصغير f)
        stage('Build Frontend') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                dir('frontend') { 
                    sh 'npm install'
                    sh 'npm run build --configuration=production' 
                }
            }
        }

        // 4. Deployment (Nginx & Docker Compose)
        stage('Deploy') {
            steps {
                script {
                    try {
                        // تجربة docker-compose بالمطة
                        sh 'docker-compose up -d --build'
                    } catch (Exception e) {
                        // إذا فشلت، تجربة docker compose بالفراغ
                        sh 'docker compose up -d --build'
                    }
                }
            }
        }
    }

    post {
        success { 
            echo '🚀 SUCCESS: All projects built and deployed with Nginx!' 
        }
        failure { 
            echo '❌ FAILURE: Check the logs above.' 
        }
    }
}