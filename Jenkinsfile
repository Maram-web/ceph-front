pipeline {
    agent {
        kubernetes {
            yamlFile 'kaniko-pod.yaml'
        }
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

        stage('Docker Build & Push with Kaniko') {
            steps {
                container('kaniko') {
                    sh '''
                        /kaniko/executor \
                          --dockerfile=/workspace/Dockerfile \
                          --context=/workspace/ \
                          --destination=docker.io/marammanai/angular-front:latest \
                          --skip-tls-verify
                    '''
                }
            }
        }
    }
}
