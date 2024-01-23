#!/bin/bash
ec2_ip=`cat ./.ec2/ip.txt`

echo "Connecting to $ec2_ip"
scp -r -i ./.ec2/key.pem ./scripts ec2-user@"$ec2_ip":/home/ec2-user/ayn-rand-tg-bot
scp -r -i ./.ec2/key.pem ./package.json ec2-user@"$ec2_ip":/home/ec2-user/ayn-rand-tg-bot
scp -r -i ./.ec2/key.pem ./tsconfig.json ec2-user@"$ec2_ip":/home/ec2-user/ayn-rand-tg-bot
scp -r -i ./.ec2/key.pem ./lib ec2-user@"$ec2_ip":/home/ec2-user/ayn-rand-tg-bot
scp -r -i ./.ec2/key.pem ./index.ts ec2-user@"$ec2_ip":/home/ec2-user/ayn-rand-tg-bot

exit 0