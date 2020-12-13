# https://www.linode.com/docs/quick-answers/linux/start-service-at-boot/
echo "stopping our service..."
sudo systemctl is-active --quiet mygowebserverservice && systemctl stop mygowebserverservice
