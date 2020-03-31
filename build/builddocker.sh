if test -f "builddocker.sh"; then
    cd ..
fi

docker build -t go-example-webserver .
