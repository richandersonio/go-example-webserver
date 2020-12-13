# https://www.linode.com/docs/quick-answers/linux/start-service-at-boot/
echo "stopping our wonderful service..."
sudo systemctl is-active --quiet mygowebserverservice && systemctl stop mygowebserverservice
