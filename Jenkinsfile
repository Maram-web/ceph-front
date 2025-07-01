pipeline {
    agent any

    environment {
        DOCKER_CLI_EXPERIMENTAL = "enabled"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Maram-web/ceph-front.git'
            }
        }

        stage('Build Angular') {
            steps {
                sh '''
                    npm install
                    npm run build -- --configuration production
                '''
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker build -t marammanai/angular-front:latest .
                        docker push marammanai/angular-front:latest
                    '''
                }
            }
        }
    }
}
