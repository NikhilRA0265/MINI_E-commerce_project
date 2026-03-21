pipeline {
    agent any
     
    environment {
        IMAGE_NAME = "nikhilrao6225/mern-backend:v1"
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/NikhilRA0265/MINI_E-commerce_project'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
    }
}