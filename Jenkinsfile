pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'marammanai/angular-front:latest'
        K8S_MASTER = '192.168.13.11' // ✏️ IP ou DNS du master Kubernetes
        DEPLOY_YAML = 'k8s-deployment.yaml'
    }

    stages {
        stage('Build Angular') {
            steps {
                sh '''
                    npm install
                    npm run build -- --configuration production
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Docker Push (optionnel)') {
            when {
                expression { return false } // désactivé sauf si tu veux publier sur DockerHub
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Copy YAML to K8s Master') {
            steps {
                sh '''
                    scp $DEPLOY_YAML $K8S_MASTER:/home/jenkins/$DEPLOY_YAML
                '''
            }
        }

        stage('Deploy on Kubernetes') {
            steps {
                sh '''
                    ssh $K8S_MASTER "kubectl apply -f /home/jenkins/$DEPLOY_YAML"
                '''
            }
        }
    }
}
