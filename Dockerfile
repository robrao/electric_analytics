FROM ubuntu:14.04

ARG node_version=v8.11.1
ARG node_folder=node-${node_version}-linux-x64

# Add trusty updates to apt sources
ARG trusty_updates='deb http://us.archive.ubuntu.com/ubuntu trusty-updates restricted multiverse'
RUN echo ${trusty_updates} >> /etc/apt/sources.list

# Nginx ppa
RUN echo deb http://ppa.launchpad.net/nginx/stable/ubuntu trusty main >> /etc/apt/sources.list && \
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 \
		     --recv C300EE8C

# Add the en_US.UTF-8 locale so stuff actually works
RUN locale-gen en_US en_US.UTF-8 && \
    DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales && \
    update-locale LANG=en_US.UTF-8 LC_MESSAGES=POSIX

RUN DEBIAN_FRONTEND=noninteractive apt-get update

# Some nice to haves in a docker container and useful for building
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run
# following docker best practices, always run apt-get update first
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    python \
    g++ \
    build-essential

# Install node
RUN cd /usr/local && \
    wget https://nodejs.org/download/release/${node_version}/${node_folder}.tar.gz && \
    tar xvfz ${node_folder}.tar.gz && \
    ln -s /usr/local/${node_folder}/bin/node /usr/local/bin/node && \
    ln -s /usr/local/${node_folder}/bin/npm /usr/local/bin/npm

RUN sudo mkdir -p /electric-analytics-demo
#WORKDIR /electric-analytics-demo/electric_anal
#RUN npm install
