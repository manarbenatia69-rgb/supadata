pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'manarbenatia69' // بدلو بحسابك إذا تحب تعمل Push
        IMAGE_TAG = "latest"
    }

    stages {
        // 1. تجريب الكود من GitHub
        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        // 2. بناء الـ Backend (SpringBoot) وسط Maven Container
        stage('Build Backend') {
            agent {
                docker { 
                    image 'maven:3.9.6-eclipse-temurin-17'
                    args '-v /root/.m2:/root/.m2'
                }
            }
            steps {
                dir('supadata') { // ثبت في اسم الملف لداخل (backend folder)
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        // 3. بناء الـ Admin (Angular) وسط Node Container
        stage('Build Admin Template') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                dir('Admin') { 
                    sh 'npm install'
                    sh 'npm run build --configuration=production'
                }
            }
        }

        // 4. بناء الـ Frontend (Angular) وسط Node Container
        stage('Build Frontend Template') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build --configuration=production'
                }
            }
        }

        // 5. صناعة الـ Docker Images باستعمال الـ Dockerfiles اللي عندك
        stage('Dockerize Services') {
            steps {
                script {
                    // بناء صورة الـ Backend
                    sh "docker build -t backend-image:${IMAGE_TAG} ./supadata"
                    
                    // بناء صورة الـ Admin
                    sh "docker build -t admin-image:${IMAGE_TAG} ./Admin"
                    
                    // بناء صورة الـ Frontend
                    sh "docker build -t frontend-image:${IMAGE_TAG} ./frontend"
                }
            }
        }

        // 6. تشغيل المشروع كامل باستعمال Docker Compose
        stage('Deploy with Compose') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
                echo 'Project is live on production!'
            }
        }
    }

    post {
        always {
            cleanWs() // تنظيف الخدمة بعد ما يكمل
        }
    }
}