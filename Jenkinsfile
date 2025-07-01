pipeline {
    agent {
        kubernetes {
            yamlFile 'kaniko-pod.yaml'
        }
    }

    stages {

        stage('Prepare & Build Angular') {
            steps {
                container('node') {
                    sh '''
                        echo "📁 Copie du projet dans /workspace"
                        mkdir -p /workspace
                        cp -r . /workspace
                        cd /workspace

                        echo "📦 Installation des dépendances"
                        npm install

                        echo "🏗️ Build Angular (prod)"
                        npm run build -- --configuration production
                    '''
                }
            }
        }

        stage('Vérification des fichiers') {
            steps {
                container('node') {
                    sh '''
                        echo "📁 Contenu du build Angular"
                        ls -la /workspace/dist/flexy-admin-angular-lite
                    '''
                }
                container('kaniko') {
                    sh '''
                        echo "📄 Vérification Dockerfile"
                        cat /workspace/Dockerfile || echo "❌ Dockerfile manquant"
                    '''
                }
            }
        }

        stage('Build & Push Docker image via Kaniko') {
            steps {
                container('kaniko') {
                    sh '''
                        echo "🐳 Build et push de l'image Docker vers Docker Hub"

                        /kaniko/executor \
                          --dockerfile=/workspace/Dockerfile \
                          --context=dir:///workspace/ \
                          --destination=docker.io/marammanai/angular-front:latest \
                          --skip-tls-verify
                    '''
                }
            }
        }
    }
}
