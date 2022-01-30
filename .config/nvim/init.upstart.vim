if &compatible
  set nocompatible
endif
set encoding=utf8

set nomodeline

call plug#begin()
  " Baseline
  Plug 'bling/vim-airline'

  " Navigation
  Plug 'scrooloose/nerdtree'
  "Plug 'justinmk/vim-dirvish' "alternative to nerdtree
  " Plug 'usr/local/opt/fzf' "After installing fzf via brew
  Plug 'junegunn/fzf.vim'


  " IDE
  Plug 'tpope/vim-fugitive'
  "Plug 'tpope/vim-rails'
  Plug 'tpope/vim-dispatch'
  " Plug 'majutsushi/tagbar'
  " Plug 'preservim/tagbar'
  Plug 'neovim/nvim-lspconfig'
  Plug 'nvim-treesitter/nvim-treesitter', {'do': 'TSUpdate'} " We recommend updating the parsers on update
  Plug 'nvim-treesitter/nvim-treesitter-refactor'
  Plug 'nvim-treesitter/nvim-treesitter-textobjects'
  Plug 'romgrk/nvim-treesitter-context'
  Plug 'ngmy/vim-rubocop' " needed if not using ALE
  Plug 'airblade/vim-gitgutter'
  Plug 'rhysd/git-messenger.vim'
  Plug 'RRethy/vim-illuminate'

  " Syntax
  "Plug 'rust-lang/rust.vim'
  "Plug 'scrooloose/syntastic'
  Plug 'pangloss/vim-javascript'
  Plug 'maxmellon/vim-jsx-pretty'
  Plug 'elzr/vim-json'
  "Plug 'leafgarland/typescript-vim'
  "Plug 'othree/html5.vim'
  Plug 'slim-template/vim-slim'
  Plug 'godlygeek/tabular'
  Plug 'plasticboy/vim-markdown'
  Plug 'elixir-editors/vim-elixir'

  " Writing and notes
  Plug 'vimwiki/vimwiki'
  Plug 'junegunn/goyo.vim'
  Plug 'junegunn/limelight.vim'
  " https://github.com/soywod/kronos.vim  " Task/time manager

  " Colors
  "Plug 'flazz/vim-colorschemes'
  "Plug 'mhartington/oceanic-next'
  "Plug 'hzchirs/vim-material'
  "Plug 'patstockwell/vim-monokai-tasty'
  "Plug 'agreco/vim-citylights'
  "Plug 'bluz71/vim-moonfly-colors'
  Plug 'patstockwell/vim-monokai-tasty'
call plug#end()

filetype plugin indent on
syntax on
set hidden

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

" ctrlp ignore version control and node_modules
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]((\.(git|hg|svn))|node_modules)$'
  \ }

" ************************************************************************
" K E Y   M A P P I N G S

let mapleader = ","   " Map the leader key to comma

" :imap jk <Esc>

map <Leader>e :Explore<cr>
map <Leader>s :Vexplore<cr>

nnoremap <Leader><Leader> <c-^>

" Dispatch vim, remember :Focus to set the repeatable command
nnoremap <Leader>d :Dispatch
nnoremap <Leader>D :Dispatch<CR>

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

nnoremap <leader>n :NERDTreeToggle<cr>
nnoremap <leader>f :NERDTreeFind<cr>


" ************************************************************************
" F Z F
"

" Add custom RG search that uses ripgrep incrementally rather than fzf
"command! -bang -nargs=* Ag call fzf#vim#ag(<q-args>, {'options': '--delimiter : --nth 4..'}, <bang>0)

nnoremap <c-p> :Files<cr>
nnoremap <leader>t :Windows<cr>
nnoremap <leader>b :Buffers<cr>
nnoremap <leader>r :Rg 
nnoremap <leader>R :Rg <C-R>=expand('<cword>')<CR>

let g:fzf_layout = { 'down': '35%' }

" ************************************************************************
" C T A G S
" when configuring tagbar for osx, use ctags from brew
"let g:tagbar_ctags_bin='/usr/local/Cellar/ctags/5.8_1/bin/ctags'

" ************************************************************************
" T R E E  S I T T E R
lua <<EOF
require'lspconfig'.solargraph.setup{}
EOF

lua <<EOF
local nvim_lsp = require('lspconfig')
EOF

" ************************************************************************
" G I T   G U T T E R
let g:gitgutter_enabled = 0 "Disable by default. :GitGutterToggle to flip
let g:gitgutter_line_highlights_enabled = 1

" V I M   W I K I
" ************************************************************************
" Set path to dropbox, must be set per machine
"let g:vimwiki_list = [{'path': '~/Dropbox/my_stuff/vimwiki/',
"                     \ 'path_html': '~/Dropbox/my_stuff/vimwiki/html/'}]
"                     \ 'css_name': '/Users/zchin/Dropbox/my_stuff/vimwiki/html/main.css'}]

" ************************************************************************
" L I M E L I G H T
" In case limelight doesn't dim properly
" let g:limelight_conceal_ctermfg = 240

" ************************************************************************
" C O L O R S

" Necessary for true color and italic in vim in tmux
let &t_8f="\<Esc>[38;2;%lu;%lu;%lum"
let &t_8b="\<Esc>[48;2;%lu;%lu;%lum"
"set termguicolors

let g:vim_monokai_tasty_italic = 1
let g:airline_theme='monokai_tasty'
colorscheme vim-monokai-tasty

" colorscheme SlateDark
