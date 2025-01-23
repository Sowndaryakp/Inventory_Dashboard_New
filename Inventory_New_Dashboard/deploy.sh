#!/bin/bash

# install application
echo "installing application..."
npm install

# Build the application
echo "Building application..."
npm run build

# Deploy to server
echo "Deploying to server..."
scp -r dist/* smc@172.18.7.91:/var/www/inventorymanagement/
# scp -r dist/* $SERVER_USER@$SERVER_IP:$DEPLOY_PATH

echo "Deployment completed!"
