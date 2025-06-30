podTemplate(yamlFile: 'kaniko-pod.yaml') {
    node(POD_LABEL) {
        container('kaniko') {

            stage('Build Angular') {
                sh '''
                    npm install
                    npm run build -- --configuration production
                '''
            }

            stage('Build & Push Docker Image') {
                sh '''
                    /kaniko/executor \
                      --dockerfile=/workspace/Dockerfile \
                      --context=/workspace \
                      --destination=marammanai/angular-front:latest \
                      --skip-tls-verify
                '''
            }
        }
    }
}
