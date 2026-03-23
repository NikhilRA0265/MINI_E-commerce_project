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

        stage('Push Backend Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $BACKEND_IMAGE
                    '''
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $FRONTEND_IMAGE
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
          steps {
                 withSonarQubeEnv('sonarqube-server') {
                   sh '''
                   /opt/sonar-scanner/bin/sonar-scanner \
                    -Dsonar.projectKey=mern-project \
                    -Dsonar.sources=. 
                   '''
                }
            }
        }
    }
}