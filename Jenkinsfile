pipeline {
    agent {
        kubernetes {
            yamlFile 'kaniko-pod.yaml'
        }
    }

    stages {

        stage('Build Angular & Copy to /workspace') {
            steps {
                container('node') {
                    sh '''
                        mkdir -p /workspace
                        cp -r . /workspace
                        cd /workspace
                        npm install
                        npm run build -- --configuration production
                    '''
                }
            }
        }

        stage('Debug Check (optional)') {
            steps {
                container('node') {
                    sh 'ls -la /workspace/dist/flexy-admin-angular-lite'
                }
                container('kaniko') {
                    sh 'ls -la /workspace/Dockerfile'
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
