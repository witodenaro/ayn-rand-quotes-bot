#!/bin/bash

echo "Updating package installer.."
yum update -y

echo "Installing docker.."
yum install docker
usermod -a -G docker ec2-user
systemctl enable docker

echo "Installing docker-compose.."
curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "Installing Node.."
yum install -y nodejs

echo "Installing PM2.."
sudo npm install pm2 -g

echo "Installing NPM dependencies.."
npm i -g yarn
yarn

echo "Starting docker.."
systemctl start docker

echo "Deleting existing processes.."
pm2 delete tg-bot

echo "Clearing previous builds.."
rm -rf build/

echo "Building bot.."
yarn build

echo "Preparation completed."

exit 0