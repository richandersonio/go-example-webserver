# push the built docker image to docker hub (can only be run by rich anderson)

if test -f "dockerhub_push.sh"; then
    cd ..
fi
cd ..
docker tag go-example-webserver:latest richandersonio/public:go-example-webserver
docker push richandersonio/public:go-example-webserver