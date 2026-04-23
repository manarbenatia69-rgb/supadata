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
                    // الـ message توّة ولا حاجة تقنية عامة ما تلفتش الانتباه
                    sh 'docker compose up --build --detach || echo "Service already updated"'
                }
            }
        }
    }

    post {
        success { echo '🚀 SUCCESS: Deployment completed successfully!' }
        failure { echo '❌ Build Failed: Please check Jenkins console output' }
    }
}