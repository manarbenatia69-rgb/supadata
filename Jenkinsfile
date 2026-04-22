pipeline {
    agent any // الـ Agent الرئيسي لازم يكون موجود

    stages {
        stage('Test Docker Connection') {
            steps {
                // نثبتوا إن الـ Jenkins توا ولا يشوف في الـ Docker
                sh 'docker version' 
            }
        }

        stage('Build Backend with Maven Container') {
            agent {
                docker { 
                    image 'maven:3.9.6-eclipse-temurin-17'
                    args '-v /var/run/docker.sock:/var/run/docker.sock' // نمرروا الـ socket للـ agent الجديد زادة
                }
            }
            steps {
                dir('supadata') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
    }
}