if test -f "dockerhub_push.sh"; then
    cd ..
fi
cd ..
docker tag go-example-webserver:latest richandersonio/public:go-example-webserver
docker push richandersonio/public:go-example-webserver