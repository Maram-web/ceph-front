pipeline {
    agent any

    parameters {
        booleanParam(name: 'FORCE_BUILD', defaultValue: false, description: 'Force Angular and Docker rebuild')
    }

    environment {
        DOCKER_IMAGE = 'marammanai/angular-front:latest'
        K8S_MASTER = 'ceph1@192.168.13.11'
        DEPLOY_YAML = 'k8s-deployment.yaml'
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
                    echo "📦 Angular build en cours..."
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
                    echo "🐳 Construction de l’image Docker..."
                    docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Docker Push (optionnel)') {
            when {
                expression { return false }
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

        stage('Copie YAML sur le master K8s') {
            steps {
                sh '''
                    echo "📁 Copie du fichier YAML"
                    ssh-keyscan -H 192.168.13.11 >> ~/.ssh/known_hosts || true
                    scp $DEPLOY_YAML $K8S_MASTER:/home/ceph1/$DEPLOY_YAML
                '''
            }
        }

        stage('Création du namespace (si nécessaire)') {
            steps {
                sh '''
                    echo "📂 Création du namespace 'front' si inexistant"
                    ssh $K8S_MASTER "kubectl get ns front || kubectl create namespace front"
                '''
            }
        }

        stage('Déploiement sur Kubernetes') {
            steps {
                sh '''
                    echo "🚀 Déploiement de l’application"
                    ssh $K8S_MASTER "kubectl apply -f /home/ceph1/$DEPLOY_YAML"
                '''
            }
        }
    }
}
