pipeline {
    agent {
        kubernetes {
            yamlFile 'kaniko-pod.yaml'
        }
    }

    environment {
        IMAGE = 'marammanai/angular-front:latest'
    }

    stages {
        stage('Build Angular') {
            steps {
                container('kaniko') {
                    sh '''
                        npm install
                        npm run build -- --configuration production
                    '''
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                container('kaniko') {
                    sh '''
                        /kaniko/executor \
                          --dockerfile=Dockerfile \
                          --context=. \
                          --destination=$IMAGE \
                          --skip-tls-verify
                    '''
                }
            }
        }
    }
}
