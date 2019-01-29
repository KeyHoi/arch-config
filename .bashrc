#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias c='clear; archey3'

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$ '
# sh .scripts/setcolors.sh
# clear

export EDITOR=vim
export PATH="${PATH}:$HOME/.scripts"
powerline-daemon -q
POWERLINE_BASH_CONTINUATION=1
POWERLINE_BASH_SELECT=1
. /usr/share/powerline/bindings/bash/powerline.sh

