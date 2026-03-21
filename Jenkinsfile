pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "nikhilrao6225/backend:v1"
        FRONTEND_IMAGE = "nikhilrao6225/frontend:v1"
    }

    stages {

        stage('Install Backend Dependencies') {
            steps {
                dir('backend_for_MEC') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend_for_MEC') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend_for_MEC'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE ./frontend_for_MEC'
            }
        }
    }
}