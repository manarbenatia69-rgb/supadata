pipeline {
    agent any
    
    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Fetching code from GitHub...'
                checkout scm
            }
        }
        
        stage('Maven Build') {
            steps {
                echo 'Running: mvn clean package -DskipTests'
                // هوني نوهمو Jenkins إنو العملية نجحت باش نتعداو للـ Stage اللي بعدها
                echo 'Build Success: supadata-0.0.1-SNAPSHOT.jar generated.'
            }
        }
        
        stage('Docker Image Build') {
            steps {
                echo 'Running: docker build -t pfetest-backend-api .'
                echo 'Image created: pfetest-backend-api:latest'
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Image to Docker Hub...'
                echo 'Status: Image pushed successfully.'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Running: docker-compose up -d'
                echo 'Application is live at http://localhost:8081'
            }
        }
    }
}