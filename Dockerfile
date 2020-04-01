#
# basic docker container using the AWS base build with the go compiler installed
FROM richandersonio/public:alpine-go-builder AS build

COPY *.go /src/
RUN go get github.com/go-sql-driver/mysql
RUN go build /src/*.go


#
# Build the final container with just the app + webserver files

FROM alpine AS final

WORKDIR /webserver

# setup production environment

COPY --from=build app /webserver/
COPY public /webserver/public

CMD ["/webserver/app"]

