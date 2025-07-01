pipeline {
    agent {
        kubernetes {
            yamlFile 'kaniko-pod.yaml'
        }
    }

    stages {

        stage('Build Angular') {
            steps {
                container('node') {
                    sh '''
                        echo "📁 Copie dans /workspace"
                        mkdir -p /workspace
                        cp -r . /workspace
                        cd /workspace

                        echo "📦 npm install"
                        npm install

                        echo "🏗️ Build Angular"
                        npm run build -- --configuration production
                    '''
                }
            }
        }

        stage('Vérification des fichiers') {
            steps {
                container('node') {
                    sh '''
                        echo "📁 Contenu build :"
                        ls -la /workspace/dist/flexy-admin-angular-lite
                    '''
                }
                container('kaniko') {
                    sh '''
                        echo "📄 Dockerfile contenu :"
                        cat /workspace/Dockerfile || echo "🚫 Dockerfile manquant"
                    '''
                }
            }
        }

        stage('Docker Build & Push with Kaniko') {
            steps {
                container('kaniko') {
                    sh '''
                       
                    '''
                }
            }
        }
    }
}
