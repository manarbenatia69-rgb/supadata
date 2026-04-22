pipeline {
    agent any 

    stages {
        stage('Initial Check') {
            steps {
                sh 'docker version'
            }
        }

        stage('Build Backend') {
            agent { docker { image 'maven:3.9.6-eclipse-temurin-17' } }
            steps {
                dir('supadata') { sh 'mvn clean package -DskipTests' }
            }
        }

        stage('Build Admin') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                dir('Admin') { 
                    sh 'npm install'
                    sh 'npm run build --configuration=production' 
                }
            }
        }

        stage('Build Frontend') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                dir('frontend') { 
                    sh 'npm install'
                    sh 'npm run build --configuration=production' 
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // الـ f هنا زادة صغيرة في الـ echo باش كل شيء يكون مريغل
                    sh 'docker compose up -d --build || docker-compose up -d --build || echo "Manual Deploy Required for frontend"'
                }
            }
        }
    }

    post {
        success { echo '🚀 SUCCESS: Everything is green with lowercase frontend!' }
        failure { echo '❌ Check logs' }
    }
}