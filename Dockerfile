#
# basic docker container using the AWS base build with the go compiler installed
FROM 518822224191.dkr.ecr.us-east-1.amazonaws.com/richanderson-io:gobuilder AS build

COPY *.go /src/
RUN go build /src/*.go


#
# Build the final container with just the app + webserver files

FROM amazonlinux:2 AS final

WORKDIR /webserver

# setup production environment

COPY --from=build app /webserver/
COPY public /webserver/public

CMD ["/webserver/app"]

