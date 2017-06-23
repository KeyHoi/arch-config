" All system-wide defaults are set in $VIMRUNTIME/archlinux.vim (usually just
" /usr/share/vim/vimfiles/archlinux.vim) and sourced by the call to :runtime
" you can find below.  If you wish to change any of those settings, you should
" do it in this file (/etc/vimrc), since archlinux.vim will be overwritten
" everytime an upgrade of the vim packages is performed.  It is recommended to
" make changes after sourcing archlinux.vim since it alters the value of the
" 'compatible' option.

" This line should not be removed as it ensures that various options are
" properly set to work with the Vim-related packages.
runtime! archlinux.vim

" If you prefer the old-style vim functionalty, add 'runtime! vimrc_example.vim'
" Or better yet, read /usr/share/vim/vim80/vimrc_example.vim or the vim manual
" and configure vim to your own liking!

" do not load defaults if ~/.vimrc is missing
"let skip_defaults_vim=1
"default options
set tabstop=4
set shiftwidth=4
set number	"show line numbers
set hls 	"highlight search results
set is 		"incremental search
syntax on

"powerline support
"python3 from powerline.vim import setup as powerline_setup
"python3 powerline_setup()
"python3 del powerline_setup

"spellchecking
map <F1> :setlocal spell! spelllang=de_de<CR>
map <F2> :setlocal spell! spelllang=en_us<CR>

"comfort binding
map <Tab> <Esc>a<Tab><Esc>
map <Space> <Esc>a<Space><Esc>
map <Return> <Esc>i<Return><Esc>
map <Backspace> <Esc>a<Backspace><Esc>
map g<Right> <Esc>$
map g<Left> <Esc>0

"control mappings
map <c-a> <Esc>ggVG
map <c-w> <Esc>:w<Return>
map <c-e> <Esc>:q!<Return>

"Latex Shortcuts
autocmd FileType tex map <Space>ca  <Esc>i\documentclass{article}<Enter><Enter>\title{Titel}<Enter>\author{Dominik Pham}<Enter><Enter>\usepackage[utf8]{inputenc}<Enter>\usepackage{graphicx}<Enter>\usepackage{wrapfig}<Enter><Enter>\begin{document}<Enter>\maketitle<Enter><Enter><Enter><Enter>\end{document}<Up><Up><Left><Esc>
autocmd FileType tex map <Space>cp  <Esc>i\documentclass{beamer}<Enter><Enter>\title{Titel}<Enter>\author{Dominik Pham}<Enter><Enter>\usepackage{graphicx}<Enter>\usepackage{wrapfig}<Enter><Enter>\usetheme{Montpellier}<Enter><Enter>\begin{document}<Enter>\maketitle<Enter><Enter><Enter><Enter>\end{document}<Up><Up><Left><Esc>
autocmd FileType tex map <Space>cl  <Esc>i\documentclass{letter}<Enter><Enter>\title{Titel}<Enter>\author{Dominik Pham}<Enter><Enter>\usepackage{graphicx}<Enter>\usepackage{wrapfig}<Enter><Enter>\usetheme{Montpellier}<Enter><Enter>\begin{document}<Enter>\maketitle<Enter><Enter><Enter><Enter>\end{document}<Up><Up><Left><Esc>

autocmd FileType tex map <Space>h1 <Esc>i\chapter{}<Left>
autocmd FileType tex map <Space>h2 <Esc>i\section{}<Left>
autocmd FileType tex map <Space>h3 <Esc>i\subsection{} <Left>

autocmd FileType tex map <Space>ml <Esc>i\begin{flushleft}<Return><Return><Return><Return>\end{flushleft}<Up><Up>
autocmd FileType tex map <Space>mc <Esc>i\begin{center}<Return><Return><Return><Return>\end{center}<Up><Up>
autocmd FileType tex map <Space>mr <Esc>i\begin{flushright}<Return><Return><Return><Return>\end{flushright}<Up><Up>
autocmd FileType tex map <Space>bl <Esc>i\begin{list_type}<Return><Return><Return><Return>\end{flushright}<Up><Up>
autocmd FileType tex map <Space>bf <Esc>i\begin{figure}<Return><Return>\end{figure}<Up>
autocmd FileType tex map <Space>bwf <Esc>i\begin{wrapfigure}{r}{}<Return><Return>\end{wrapfigure}<Up>
autocmd FileType tex map <Space>i <Esc>i\includegraphics[width=0.7\textwidth]{}<Left>
autocmd FileType tex map <Space>hp <Esc>i\caption{}<Left><Left> 

autocmd FileType tex map <Space>fr <Esc>i\begin{frame}<Return>\frametitle{}<Return><Return>\section{}<Return><Return>\end{frame}<Up><Up><Up><Up> 
autocmd FileType tex map <Space>bi <Esc>i\begin{itemize}<Return><Return>\end{itemize}<Up> 
autocmd FileType tex map <Space>it <Esc>i\item 
autocmd FileType tex map <Space>cc <Esc>i\begin{columns}<Return><Return>\end{columns}<Up> 
autocmd FileType tex map <Space>c <Esc>i\column{.5\textwidth}<Return>

"C main method
autocmd FileType c map <Space>m <Esc>i#include <stdio.h><Return>#include <stdlib.h><Return><Return>int main(int argc, char** argv)<Return>{<Return><Return>}<Up>

autocmd FileType c map <Space>in <Esc>ggi<Return><Up>#include <>

autocmd FileType c map <Space>p <Esc>i<Tab>printf("%s\n",);<Left><Left><Space>

autocmd FileType c map <Space>fv <Esc>avoid test()<Return>{<Return><Return>}<Up><Up><Up><Esc>wvw<Left>c
autocmd FileType c map <Space>fi <Esc>aint test()<Return>{<Return><Return>}<Up><Up><Up><Esc>wvw<Left>c

autocmd FileType c map <Space>dv <Esc>avoid test();<Esc>0wvw<Left>c
autocmd FileType c map <Space>di <Esc>aint test();<Esc>0wvw<Left>c

autocmd FileType c map <Space>fl <Esc>aint i;<Return>for(i=0; i<; i++)<Return>{<Return><Return>}<Esc><s-v><Up><Up><Up>
autocmd FileType c map <Space>wl <Esc>awhile(true)<Return>{<Return><Return>}<Esc><s-v><Up><Up>
autocmd FileType c map <Space>wl <Esc>awhile(true)<Return>{<Return><Return>}<Esc><s-v><Up><Up>

autocmd FileType c map <Space>if <Esc>aif()<Return>{<Return><Return>}<Esc><s-v><Up><Up>
autocmd FileType c map <Space>ife <Esc>aif()<Return>{<Return><Return>}<Return>else<Return>{<Return><Return>}<Esc><s-v><Up><Up><Up><Up><Up><Up>
