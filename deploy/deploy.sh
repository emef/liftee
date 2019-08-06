#!/bin/bash

pushd `dirname $0` > /dev/null
DEPLOYDIR=`pwd`
popd > /dev/null
BUILDPATH=`realpath $DEPLOYDIR/../build`
NGINXCONF=$DEPLOYDIR/nginx.conf

deploy() {
  echo "deploying to $LIFTEE_HOST"
  echo "using build path $BUILDPATH"

  echo "rsyncing build"
  ssh $LIFTEE_HOST "sudo mkdir -p /opt/liftee/"
  ssh $LIFTEE_HOST "sudo rm -rf /opt/liftee/*"
  rsync -az $BUILDPATH $LIFTEE_HOST:
  ssh $LIFTEE_HOST "sudo mv build/* /opt/liftee"
  ssh $LIFTEE_HOST "rmdir build"

  echo "installing nginx config and restarting it"
  #scp $NGINXCONF $LIFTEE_HOST: &>/dev/null
  #ssh $LIFTEE_HOST "sudo mv nginx.conf /etc/nginx/sites-available/liftee"
  #ssh $LIFTEE_HOST "sudo ln -s /etc/nginx/sites-available/liftee /etc/nginx/sites-enabled/" &>/dev/null
  ssh $LIFTEE_HOST "sudo service nginx restart"

}

deploy
