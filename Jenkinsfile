pipeline {
    agent any

	tools {
        nodejs 'nodejs' // 'nodejs' is the name you've given the NodeJS installation in Jenkins
    }
    stages {
		stage('Install Dependencies') {
            steps {
				dir('my-search-app'){
					// Install the project dependencies from package.json
					sh 'npm install'
				}                
            }
        }
        stage('Integration & UI testing') {
            steps {
				dir('my-search-app'){
				// Run integration tests				
                sh 'echo "Run your integration & UI tests here"'
                // For example, if you use npm, you might run `npm test`
				sh 'npm test'
				}                
            }
        }
		//stage('Build and Test with Docker Compose') {
        //    steps {
		//			
        //            // Run Docker Compose commands
        //            sh 'docker compose -f docker-compose.yml up --build'
        //            // Other pipeline steps as needed
        //    }
        //}
		stage('OWASP Dependency-Check Vulnerabilities') {
			  steps {
				dir('my-search-app') {
					dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP'
					dependencyCheckPublisher pattern: 'dependency-check-report.xml'
					echo 'Vulnerabilities checked...'
				}
			  }
		}
		stage('SonarQube Analysis') {
			steps {
				script {
					def scannerHome = tool 'sonarqube';
					withSonarQubeEnv('sonarqube') {
						sh """
							${scannerHome}/bin/sonar-scanner \
							-Dsonar.projectKey=ICT3103_Practice \
							-Dsonar.sources=. \
							-Dsonar.host.url=http:sonarqube:9000 \
							-Dsonar.token=sqp_87b6e1c6cd72c208ffd9a166a0b8edd3267c3b46
							"""
					}
				}
			}
		}

    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
			//recordIssues enabledForFailure: true, tool: sonarQube()
        }
        success {
            // Actions to perform if the pipeline succeeds
            echo 'The pipeline succeeded!'
        }
        failure {
            // Actions to perform if the pipeline fails
            echo 'The pipeline failed!'
        }
    }
}
