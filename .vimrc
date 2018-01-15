set tabstop=4
set shiftwidth=4
set number	"show line numbers
set hls 	"highlight search results
set is 		"incremental search
syntax on

" Plug '.vim/wal.vim'
" colorscheme wal

"spellchecking
map <F5> :setlocal spell! spelllang=de_de<CR>
map <F6> :setlocal spell! spelllang=en_us<CR>

"control mappings
nnoremap ya <Esc>ggVG
nnoremap <C-w> <Esc>:w<Return>
nnoremap <C-e> <Esc>:q!<Return>

