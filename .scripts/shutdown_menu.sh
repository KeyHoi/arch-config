#!/bin/bash

choice="$(printf Shutdown'\n'Reboot'\n'Suspend | dmenu -i -p "What do you want to do?" -fn monospace -sb '#42f45f' -sf '#000000' -nb '#000000' -nf '#42f45f')"

case "$choice" in 
	"Shutdown")
		 shutdown -h now
		;;
	"Reboot")
		reboot
		;;
	"Suspend")
		systemctl suspend
		;;
esac
