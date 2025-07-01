pipeline {
    agent any

    parameters {
        booleanParam(name: 'FORCE_BUILD', defaultValue: false, description: 'Force Angular and Docker rebuild')
    }

    environment {
        DOCKER_IMAGE = 'marammanai/angular-front:latest'
        K8S_MASTER = 'ceph1@192.168.13.11'
        DEPLOY_YAML = 'k8s-deployment.yaml'  // Ton fichier YAML combiné (deployment + service)
    }

    stages {
        stage('Build Angular') {
            when {
                anyOf {
                    changeset "src/**"
                    expression { return params.FORCE_BUILD }
                }
            }
            steps {
                sh '''
                    echo "📦 Running Angular Build"
                    npm install
                    npm run build -- --configuration production
                '''
            }
        }

        stage('Docker Build') {
            when {
                anyOf {
                    changeset "dist/**"
                    expression { return params.FORCE_BUILD }
                }
            }
            steps {
                sh '''
                    echo "🐳 Building Docker image"
                    docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Docker Push (optionnel)') {
            when {
                expression { return false }  // Active-le si tu veux publier vers DockerHub
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
                    echo "📁 Copie du fichier YAML vers le master Kubernetes"
                    ssh-keyscan -H 192.168.13.11 >> ~/.ssh/known_hosts || true
                    scp $DEPLOY_YAML $K8S_MASTER:/home/ceph1/$DEPLOY_YAML
                '''
            }
        }

        stage('Deploy on Kubernetes') {
            steps {
                sh '''
                    echo "🚀 Déploiement sur Kubernetes"
                    ssh $K8S_MASTER "kubectl apply -f /home/ceph1/$DEPLOY_YAML"
                '''
            }
        }
    }
}
