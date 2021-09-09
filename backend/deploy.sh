echo What should the version be?
read VERSION

docker build -t fivanusec/kindie:$VERSION .
docker push fivanusec/kindie:$VERSION
ssh root@167.71.45.149 "docker pull fivanusec/kindie:$VERSION && docker tag fivanusec/kindie:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"