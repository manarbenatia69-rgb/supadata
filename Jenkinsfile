pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/manarbenatia69-rgb/supadata.git'
            }
        }

        stage('Backend Build') {
            steps {
                dir('Admin') {
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
                dir('Admin') {
                    sh 'docker build -t backend-app .'
                }
            }
        }

        stage('Docker Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t frontend-app .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                    docker stop backend || true
                    docker stop frontend || true

                    docker rm backend || true
                    docker rm frontend || true

                    docker run -d -p 8081:8081 --name backend backend-app
                    docker run -d -p 4200:80 --name frontend frontend-app
                '''
            }
        }
    }

    post {
        success {
            echo '🎯 PIPELINE SUCCESS - FULL DEVOPS DEPLOYED'
        }
    }
}
