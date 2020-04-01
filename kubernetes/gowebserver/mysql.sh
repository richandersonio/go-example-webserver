# hacky way to sh into a running mysql container (testing on docker desktop kubernetes)

CONTAINERID=$(docker ps | grep k8s_mysql | rev | cut -d ' ' -f 1 | rev)
echo "mysql container id: " $CONTAINERID

docker exec -it $CONTAINERID bash -c "mysql"
