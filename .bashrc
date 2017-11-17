#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#powerline-daemon -q
#POWERLINE_BASH_CONTINUATION=1
#POWERLINE_BASH_SELECT=1
#. /usr/lib/python3.6/site-packages/powerline/bindings/bash/powerline.sh

alias eduroam='sudo wpa_supplicant -i wlp3s0 -c .cat_installer/cat_installer.conf'
alias at_home='sudo dhcpcd enp0s25 & sudo netctl start wlp3s0-home'
alias update='pacaur -Syu --noconfirm'
alias clear_internet='sudo killall wpa_supplicant & sudo dhcpcd -k enp0s25 & sudo ip link set wlp3s0 down'
alias ls='ls --color=auto'
#alias cd='cd && clear'
PS1='[\u@\h \w]\n> '
setsid wal -r
clear

export PATH="${PATH}:~/.scripts/"
