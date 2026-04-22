pipeline {
    agent any 

    stages {
        stage('Initial Check') {
            steps {
                sh 'docker version'
                sh 'node -v'
                sh 'mvn -v'
            }
        }

        // 1. Stage الـ Backend
        stage('Build Backend') {
            steps {
                dir('supadata') { // اسم Dossier الـ Backend (IntelliJ)
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        // 2. Stage الـ Admin
        stage('Build Admin') {
            steps {
                dir('Admin') { // اسم Dossier الـ Admin
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        // 3. Stage الـ Frontend
        stage('Build Frontend') {
            steps {
                dir('Frontend') { // اسم Dossier الـ Frontend الـ Client
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        // 4. Stage الـ Docker Deployment (الضربة القاضية)
        stage('Deploy with Docker Compose') {
            steps {
                // هوني الـ Jenkins يعاود يشغل الـ Containers بالنسخة الجديدة
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully! All services are up.'
        }
    }
}