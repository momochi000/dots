if &compatible
  set nocompatible
endif

call plug#begin()
  " Baseline
  Plug 'tpope/vim-sensible'
  Plug 'bling/vim-airline'

  " Navigation
  Plug 'scrooloose/nerdtree'
  Plug 'tpope/vim-vinegar' "alternative to nerdtree
  "Plug 'justinmk/vim-dirvish' "alternative to nerdtree
  Plug 'kien/ctrlp.vim'
  Plug 'mileszs/ack.vim'
  Plug 'junegunn/fzf.vim'


  " IDE
  Plug 'tpope/vim-fugitive'
  Plug 'tpope/vim-rails'
  Plug 'tpope/vim-dispatch'
  Plug 'majutsushi/tagbar'
  "Plug 'liuchengxu/vista.vim'
  "Plug 'tpope/vim-projectionist'  " vim-rails for any other framework
  "Plug 'w0rp/ale' "async linting
  "Plug 'neoclide/coc.nvim' "Code completion
  "Plug 'rhysd/git-messenger.vim'
  "Plug 'RRethy/vim-hexokinase'
  "Plug 'welle/context.vim' "This is really great for reading big ugly code
  Plug 'airblade/vim-gitgutter'

  " Syntax
  Plug 'rust-lang/rust.vim'
  Plug 'scrooloose/syntastic'
  Plug 'pangloss/vim-javascript'
  Plug 'mxw/vim-jsx'
  Plug 'styled-components/vim-styled-components'
  Plug 'elzr/vim-json'
  Plug 'leafgarland/typescript-vim'
  Plug 'othree/html5.vim'

  " Writing and notes
  Plug 'vimwiki/vimwiki'
  Plug 'junegunn/goyo.vim'
  Plug 'junegunn/limelight.vim'
  " https://github.com/soywod/kronos.vim  " Task/time manager

  " Colors
  "Plug 'flazz/vim-colorschemes'
  Plug 'mhartington/oceanic-next'
  "Plug 'hzchirs/vim-material'
  "Plug 'patstockwell/vim-monokai-tasty'
  "Plug 'agreco/vim-citylights'
  "Plug 'bluz71/vim-moonfly-colors'
  "https://github.com/challenger-deep-theme/vim
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

" Show regex replacement in realtime
set inccommand=nosplit

" Always display a status line at the bottom of the window
set laststatus=2

" showmatch: Show the matching bracket for the last ')'?
set showmatch

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
map <Leader>s :Sexplore<cr>

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


" Use ack.vim rather than ag.vim but use ag (silver searcher) rather than ack.
" Ugh
if executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif
nnoremap <leader>a :Ack!<Space>
nnoremap <leader>A :Ack! "<C-R>=expand('<cword>')<CR>"<cr>


" ************************************************************************
" F Z F
"

" Add custom RG search that uses ripgrep incrementally rather than fzf
function! RipgrepFzf(query, fullscreen)
  let command_fmt = 'rg --column --line-number --no-heading --color=always --smart-case %s || true'
  let initial_command = printf(command_fmt, shellescape(a:query))
  let reload_command = printf(command_fmt, '{q}')
  let spec = {'options': ['--phony', '--query', a:query, '--bind', 'change:reload:'.reload_command]}
  call fzf#vim#grep(initial_command, 1, fzf#vim#with_preview(spec), a:fullscreen)
endfunction
command! -nargs=* -bang RG call RipgrepFzf(<q-args>, <bang>0)

" Customizes Rg to show a preview window
command! -bang -nargs=* Rg
  \ call fzf#vim#grep(
  \   'rg --column --line-number --no-heading --color=always --smart-case '.shellescape(<q-args>), 1,
  \   fzf#vim#with_preview(), <bang>0)

nnoremap <c-p> :Files<cr>
nnoremap <leader>t :Windows<cr>
nnoremap <leader>b :Buffers<cr>
nnoremap <leader>r :Rg 
nnoremap <leader>R :Rg <C-R>=expand('<cword>')<CR>


" ************************************************************************
" C O C   C O M P L E T I O N
" ctrl-space to trigger autocompletion
" Note: need to add coc.preferences.autoTrigger: trigger to :CocConfig first
inoremap <silent><expr> <c-space> coc#refresh()

" carriage return to confirm the suggestion
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"


" ************************************************************************
" C T A G S
" when configuring tagbar for osx, use ctags from brew
"let g:tagbar_ctags_bin='/usr/local/Cellar/ctags/5.8_1/bin/ctags'

" ************************************************************************
" L I N T I N G
" For ale
"let g:ale_completion_enabled = 0 "No autocomplete
"let g:ale_lint_on_text_changed = 'never'
"let g:ale_lint_on_enter = 0

" ************************************************************************
" G I T   G U T T E R
let g:gitgutter_enabled = 0


" ************************************************************************
" L I M E L I G H T
" In case limelight doesn't dim properly
" let g:limelight_conceal_ctermfg = 240

" ************************************************************************
" C O L O R S

set background=dark
colorscheme OceanicNext
let g:airline_theme='oceanicnext'

"let g:vim_monokai_tasty_italic = 1
"colorscheme vim-monokai-tasty
"let g:airline_theme='monokai_tasty'

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
