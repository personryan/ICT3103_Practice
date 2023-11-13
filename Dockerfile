FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y git curl
RUN curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
RUN git config --global user.name "personryan" && git config --global user.email "mageryan1@gmail.com"
USER jenkins
