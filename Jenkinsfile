pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "supadata-backend"
        FRONTEND_IMAGE = "supadata-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/manarbenatia69-rgb/supadata.git'
            }
        }

        stage('Backend Build') {
            steps {
                dir('supadata') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                dir('supadata') {
                    sh 'docker build -t supadata-backend .'
                }
            }
        }

        stage('Docker Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t supadata-frontend .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                    docker rm -f backend || true
                    docker rm -f frontend || true

                    docker run -d -p 8081:8081 --name backend supadata-backend
                    docker run -d -p 4200:80 --name frontend supadata-frontend
                '''
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS: PROJECT DEPLOYED"
        }
        failure {
            echo "❌ FAILED: CHECK LOGS"
        }
    }
}