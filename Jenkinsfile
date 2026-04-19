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
                bat 'mvn clean install -DskipTests'
            }
        }

        stage('Run Backend Tests') {
            steps {
                bat 'mvn test'
            }
        }
    }

    post {
        success {
            echo '🎯 BACKEND OK - PIPELINE SUCCESS'
        }
    }
}