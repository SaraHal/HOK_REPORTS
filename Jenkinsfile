pipeline {
    agent {
        docker {
            image 'node:7.4'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'node -v'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
