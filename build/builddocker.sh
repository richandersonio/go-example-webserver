# build the app and create a container for it and the associate website files

if test -f "builddocker.sh"; then
    cd ..
fi

docker build -t go-example-webserver .
