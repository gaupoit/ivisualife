#!/usr/bin/env bash

yum update

# Install EPEL repo support
yum install -y epel-release

#function check package is installed
installed() {
  if rpm -q "$1" >/dev/null; then
    echo "Installed " $1
  else
    yum install -y $1
  fi
}

# install some basics
installed vim
installed git
installed nodejs
installed npm

# install npm packages
npm install -y bower -g
npm install -y pm2 -g
npm install -y forever -g

#iptable
systemctl stop firewalld
systemctl mask firewalld
installed iptables-services

# add official Nginx repo, install and start ngnix
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
installed nginx

# config nginx service
NGINXSETUP=$(cat <<"EOF"
server {
    listen 80;

    server_name vl.dev.com www.vl.dev.com;

    location / {
        proxy_pass http://localhost:8082;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
)
echo "${NGINXSETUP}" > /etc/nginx/conf.d/ivl.conf

sudo systemctl enable nginx.service
sudo systemctl start nginx.service

#Configure the package management system (YUM).
sudo cat << EOF > /etc/yum.repos.d/mongodb.repo
[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1
EOF

#Install the MongoDB packages and associated tools.
installed mongodb-org

cat << EOF >> /etc/yum.conf
exclude=mongodb-org,mongodb-org-server,mongodb-org-shell,mongodb-org-mongos,mongodb-org-tools
EOF

#Start mongodb
service mongod start
echo "mongodb started"
export LC_ALL=C

#install bower
cd /var/www/ivisualife/public
bower install --allow-root

#Start ivisualife
cd /var/www/ivisualife
npm install

cs="\033[33m"
ce="\033[0m"
echo -e $cs "Provisioning completed!" $ce
echo -e $cs "Add this line in your /etc/hosts file:" $ce "\n"
echo -e "\t192.168.33.11 vl.dev.com\n"
echo -e $cs "And visit http://vl.dev.com/ to see your dev page" $ce "\n"

forever start -w server.js
