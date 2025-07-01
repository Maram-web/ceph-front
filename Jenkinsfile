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

        stage('Copy project to /workspace') {
            steps {
                container('kaniko') {
                    sh '''
                        cp -r . /workspace/
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
                          --context=dir:///workspace/ \
                          --destination=docker.io/marammanai/angular-front:latest \
                          --skip-tls-verify
                    '''
                }
            }
        }
    }
}
