pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo "Cloning project..."
            }
        }

        stage('Backend (Admin)') {
            steps {
                dir('Admin') {
                    echo "Backend running..."
                }
            }
        }

        stage('Frontend') {
            steps {
                dir('frontend') {
                    echo "Frontend running..."
                }
            }
        }
    }
}
