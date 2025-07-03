pipeline {
    agent any

    environment {
        DOCKER_REPO = "marammanai/angular-front"
        K8S_MASTER = "ceph1@192.168.13.11"
        DEPLOY_TEMPLATE = "k8s-deployment.yaml"
        DEPLOY_FINAL = "k8s-deployment.yaml"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'front-first', url: 'https://github.com/Maram-web/ceph-front.git'
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    def GIT_COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG = "v${new Date().format('yyyyMMdd-HHmmss')}-${GIT_COMMIT_HASH}"
                    env.DOCKER_IMAGE = "${DOCKER_REPO}:${IMAGE_TAG}"
                }
            }
        }

        stage('Build Angular') {
            steps {
                sh '''
                    echo "📦 Building Angular app"
                    npm install -g @angular/cli
                    npm install
                    ng build --configuration=production
                '''
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "🐳 Building Docker image"
                        docker build -t $DOCKER_IMAGE .

                        echo "📤 Docker login & push"
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Prepare K8s YAML') {
            steps {
                sh '''
                    echo "📝 Preparing YAML with updated image tag"
                    sed "s|__IMAGE_TAG__|$IMAGE_TAG|g" $DEPLOY_TEMPLATE > $DEPLOY_FINAL
                '''
            }
        }

        stage('Copy YAML to Master') {
            steps {
                sh '''
                    echo "📁 Copying YAML to K8s master"
                    ssh-keyscan -H 192.168.13.11 >> ~/.ssh/known_hosts
                    scp $DEPLOY_FINAL $K8S_MASTER:/home/ceph1/$DEPLOY_FINAL
                '''
            }
        }

        stage('Deploy on Kubernetes') {
            steps {
                sh '''
                    echo "🚀 Deploying to Kubernetes"
                    ssh $K8S_MASTER kubectl apply -f /home/ceph1/$DEPLOY_FINAL
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Déploiement réussi avec l'image : ${DOCKER_IMAGE}"
        }
        failure {
            echo "❌ Pipeline échoué"
        }
    }
}
