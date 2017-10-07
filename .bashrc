#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias vim='vim -u .vim/vimrc'
#PS1='$(alsi -l)\n\n[\u@\h \w]\n> '
PS1='[\u@\h \w]\n> '
# (wal -r &)
setsid wal -r
clear
