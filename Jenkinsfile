pipeline {
    agent any
    
    tools {
        maven 'Maven 3.x' // Thabbet mel esm hedha f Jenkins (Global Tool Configuration)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/manarbenatia69-rgb/supadata.git'
            }
        }
        
        stage('Build Artifact') {
            steps {
                // Binnesba l-Windows nesta3mlou "bat"
                bat 'mvn -f supadata/pom.xml clean package -DskipTests'
            }
        }
        
        stage('Docker Deploy') {
            steps {
                // N-sakrou el qdim w n-7ellou el jdid
                bat 'docker-compose down'
                bat 'docker-compose up -d --build'
            }
        }
    }
}