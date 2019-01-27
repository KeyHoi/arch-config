#!/bin/bash

choice="$(printf sound'\n'monitor'\n'connections'\n'appearance | dmenu -i -p "What do you want to do?" -fn monospace -sb '#42f45f' -sf '#000000' -nb '#000000' -nf '#42f45f')"

case "$choice" in 
	"sound")
		pavucontrol
		;;
	"monitor")
		arandr
		;;
	"connections")
		nm-connection-editor
		;;
	"appearance")
		lxappearance
		;;
esac
