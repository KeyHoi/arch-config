#!/bin/bash

choice="$(printf sound'\n'monitor'\n'connections'\n'appearance | dmenu -i -p "settings" -fn 'monospace:size=12' -sb '#42f45f' -sf '#000000' -nb '#000000' -nf '#42f45f')"

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
