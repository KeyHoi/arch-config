#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias eduroam='sudo wpa_supplicant -i wlp3s0 -c .cat_installer/cat_installer.conf'
alias motius='sudo wpa_supplicant -i wlp3s0 -c .cat_installer/motius_intern.conf'
alias at_home='sudo dhcpcd enp0s25 & sudo netctl start wlp3s0-home'
alias update='pacaur -Syu --noconfirm'
alias clear_internet='sudo dhcpcd -k enp0s25 & sudo dhcpcd -k wlp3s0 & sudo killall wpa_supplicant & sudo ip link set wlp3s0 down'
alias ls='ls --color=auto'

PS1='[\u@\h \w]\n> '
setsid wal -r
clear

export PATH="${PATH}:~/.scripts/"
