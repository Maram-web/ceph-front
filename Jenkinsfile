pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "marammanai/angular-front:latest"
        K8S_MASTER = "ceph1@192.168.13.11"
        DEPLOY_YAML = "k8s-deployment.yaml"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'front-first', url: 'https://github.com/Maram-web/ceph-front.git'
            }
        }

        stage('Check if Image Exists') {
            steps {
                script {
                    def imageExists = sh (
                        script: "docker pull $DOCKER_IMAGE > /dev/null 2>&1 && echo true || echo false",
                        returnStdout: true
                    ).trim()
                    env.SKIP_BUILD = imageExists
                }
            }
        }

        stage('Build Angular') {
            when {
                expression { return env.SKIP_BUILD == "false" }
            }
            steps {
                sh '''
                    echo "📦 Build Angular app"
                    npm install -g @angular/cli
                    npm install
                    ng build --configuration=production
                '''
            }
        }

        stage('Docker Build') {
            when {
                expression { return env.SKIP_BUILD == "false" }
            }
            steps {
                sh '''
                    echo "🐳 Build Docker image"
                    docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Docker Push') {
            when {
                expression { return env.SKIP_BUILD == "false" }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "📤 Docker login & push"
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
                    ssh-keyscan -H 192.168.13.11 >> ~/.ssh/known_hosts
                    scp $DEPLOY_YAML $K8S_MASTER:/home/ceph1/$DEPLOY_YAML
                '''
            }
        }

        stage('Deploy on Kubernetes') {
            steps {
                sh '''
                    echo "🚀 Déploiement sur Kubernetes"
                    ssh $K8S_MASTER kubectl apply -f /home/ceph1/$DEPLOY_YAML
                '''
            }
        }
    }

    post {
        failure {
            echo "❌ Pipeline échoué"
        }
        success {
            echo "✅ Pipeline réussi"
        }
    }
}
