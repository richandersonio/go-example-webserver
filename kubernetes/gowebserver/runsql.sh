CONTAINERID=$(docker ps | grep k8s_mysql | rev | cut -d ' ' -f 1 | rev)
echo "mysql container id: " $CONTAINERID

# copy the latest db.sql to the container
docker cp ../../db/db.sql $CONTAINERID:/db.sql

# run the sql scriptcopy the latest db.sql to the container

docker exec -it $CONTAINERID bash -c "mysql < db.sql"
