echo What should the version be?
read VERSION

echo What is your server?
read IP

docker build -t fivanusec/kindie-test:$VERSION .
docker push fivanusec/kindie-test:$VERSION
ssh root@$IP "docker pull fivanusec/kindie-test:$VERSION && docker tag fivanusec/kindie-test:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"