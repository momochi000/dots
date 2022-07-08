if &compatible
  set nocompatible
endif
set encoding=utf8


filetype plugin indent on
syntax enable

" allow backspacing over everything in insert mode
set backspace=indent,eol,start


" I like 2 spaces for indenting
set shiftwidth=2

" I like 4 stops
set tabstop=4

" Spaces instead of tabs
set expandtab

" Always  set auto indenting on
set autoindent

" select when using the mouse
set selectmode=mouse

" Don't use hyphens as word boundaries
set iskeyword +=-

" set the commandheight
set cmdheight=2

" turn off autocommenting
set formatoptions-=cro

set nobackup
set nowritebackup

" show the cursor position all the time
set ruler

" show (partial) commands
set showcmd

" do incremental searches (annoying but handy);
set incsearch

" Show regex replacement in realtime
set inccommand=nosplit

" Always display a status line at the bottom of the window
set laststatus=2

" showmatch: Show the matching bracket for the last ')'?
set showmatch
set matchpairs=(:),\[:\],{:},<:>

" fold by indentation
set foldmethod=indent
" Ensure everything unfolded when opening a file
set foldlevel=99

" In case NERDTree is broken
let g:netrw_banner = 0
let g:netrw_liststyle = 3
let g:netrw_browse_split = 1

" ************************************************************************
" K E Y   M A P P I N G S

let mapleader = ","   " Map the leader key to comma

" :imap jk <Esc>

map <Leader>e :Explore<cr>
map <Leader>s :Vexplore<cr>

nnoremap <Leader><Leader> <c-^>

" pressing < or > will let you indent/unident selected lines

vnoremap < <gv
vnoremap > >gv

"map <c-w>gg :vertical <c-w>f<CR>
nnoremap <c-w>gg :vertical wincmd f<CR>
"nnoremap <c-w>f :vertical wincmd f<CR>

" leader w and leader q to write and quit (respectively)
nnoremap <Leader>w :w<cr>
nnoremap <Leader>q :q<cr>

" widen/shrink split buffer
if bufwinnr(1)
  map + <c-W>>
  map - <c-W><
endif

" Leader <direction> to switch panes
nnoremap <leader>h <C-W><C-J>
nnoremap <leader>j <C-W><C-J>
nnoremap <leader>k <C-W><C-K>
nnoremap <leader>l <C-W><C-L>

set background=dark
colorscheme slate
