FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y git
RUN git config --global user.name "personryan" && git config --global user.email "mageryan1@gmail.com"
USER jenkins
