# https://www.linode.com/docs/quick-answers/linux/start-service-at-boot/
echo "starting our wonderful service..."
sudo systemctl start myservice
#sudo systemctl status myservice

# start service on reboot
#sudo systemctl enable myservice