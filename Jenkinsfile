pipeline {
    agent {
        docker {
            image 'node:20'   // ou 'node:18' si tu veux
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_CLI_EXPERIMENTAL = "enabled"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "code already checked par scm config"
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

