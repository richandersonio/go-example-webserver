# build the web server locally

if test -f "build.sh"; then
    cd ..
fi

go build app.go routes.go
ls -l app 
