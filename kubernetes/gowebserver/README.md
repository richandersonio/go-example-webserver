# Kubernetes

YAML files to deploy the web site and mysql.

## Local setup

Build the web server and then run it:

Start up the web server and mysql locally:

```bash
/start.sh
```

Create the database, user and tables + example data.

```bash
./runsql.sh
```

## Login to mysql

```bash
./mysql/sh
```

## Clean up

Tear down the cluster/deployments, losing *all* data you may have added to the database:

```bash
./stop.sh
```