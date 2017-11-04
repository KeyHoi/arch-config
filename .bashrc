#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#powerline-daemon -q
#POWERLINE_BASH_CONTINUATION=1
#POWERLINE_BASH_SELECT=1
#. /usr/lib/python3.6/site-packages/powerline/bindings/bash/powerline.sh

alias update='sudo pacman -Syu --noconfirm'
alias ls='ls --color=auto'
#alias cd='cd && clear'
PS1='[\u@\h \w]\n> '
setsid wal -r
clear

export PATH="${PATH}:~/.intellij-idea/bin"
export PATH="${PATH}:~/.scripts/"
