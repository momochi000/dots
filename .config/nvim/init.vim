if &compatible
  set nocompatible
endif

call plug#begin()
  " Baseline
  Plug 'tpope/vim-sensible'
  Plug 'bling/vim-airline'

  " Navigation
  Plug 'scrooloose/nerdtree'
  Plug 'tpope/vim-vinegar'
  "Plug 'justinmk/vim-dirvish'
  Plug 'kien/ctrlp.vim'
  Plug 'mileszs/ack.vim'

  " IDE
  Plug 'tpope/vim-fugitive'
  Plug 'tpope/vim-rails'
  " Plug 'tpope/vim-projectionist'  " vim-rails for any other framework
  Plug 'tpope/vim-dispatch'
  "Plug 'w0rp/ale' "async linting
  "Plug neoclide/coc.nvim "Code completion

  " Syntax
  Plug 'rust-lang/rust.vim'
  Plug 'scrooloose/syntastic'
  Plug 'pangloss/vim-javascript'
  Plug 'mxw/vim-jsx'
  Plug 'styled-components/vim-styled-components'
  Plug 'elzr/vim-json'
  Plug 'leafgarland/typescript-vim'
  Plug 'othree/html5.vim'
  Plug 'majutsushi/tagbar'

  " Writing and notes
  Plug 'vimwiki/vimwiki'
  Plug 'junegunn/goyo.vim'
  Plug 'junegunn/limelight.vim'

  " Colors
  Plug 'flazz/vim-colorschemes'
  Plug 'mhartington/oceanic-next'
  Plug 'hzchirs/vim-material'
  Plug 'patstockwell/vim-monokai-tasty'
  Plug 'agreco/vim-citylights'
  " Plug 'bluz71/vim-moonfly-colors'
call plug#end()

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

" Always display a status line at the bottom of the window
set laststatus=2

" showmatch: Show the matching bracket for the last ')'?
set showmatch

" fold by indentation
set foldmethod=indent
" Ensure everything unfolded when opening a file
set foldlevel=99


" ************************************************************************
" K E Y   M A P P I N G S

let mapleader = ","   " Map the leader key to comma

" :imap jk <Esc>

map <Leader>e :Explore<cr>
map <Leader>s :Sexplore<cr>

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

nnoremap <leader>j <C-W><C-J>
nnoremap <leader>k <C-W><C-K>
nnoremap <leader>l <C-W><C-L>

nnoremap <leader>n :NERDTreeToggle<cr>
nnoremap <leader>f :NERDTreeFind<cr>

" Use ack.vim rather than ag.vim but use ag (silver searcher) rather than ack.
" Ugh
if executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif
nnoremap <leader>a :Ack!<Space>
nnoremap <leader>A :Ack! "<C-R>=expand('<cword>')<CR>"<cr>


" ctrlp ignore version control and node_modules
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]((\.(git|hg|svn))|node_modules)$'
  \ }

set background=dark
colorscheme OceanicNext
let g:airline_theme='oceanicnext'

" fenetikm/falcon
" colorscheme SlateDark
" Chasing_Logic "What I'm using on remote dev
" VisualStudioDark
" simplifysimplify-dark
" vrunchbang-dark
" office-dark
" forgotten-dark
" vim-material
" one-dark
" cobalt
" newproggie
" synthwave
" SerialExperimentsLain
" basic-dark
" spring-night
" eldar
" quantum
" lucario
" cyberpunk
" PerfectDark
" 1989 " not enough contrast but easy on the eyes
" evokai
" obsidian
