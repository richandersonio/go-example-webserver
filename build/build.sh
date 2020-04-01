# build the web server locally

if test -f "build.sh"; then
    cd ..
fi

go build *.go
ls -l app 
