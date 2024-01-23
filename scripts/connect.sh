#!/bin/bash
ec2_ip=`cat ./.ec2/ip.txt`

ssh -i ./.ec2/key.pem ec2-user@"$ec2_ip"

exit 0