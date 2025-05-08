require'nvim-treesitter.configs'.setup {
  -- A list of parser names, or "all" (the five listed parsers should always be installed)
  ensure_installed = { "c", "lua", "vim", "vimdoc", "query",
    --"ruby",
    --"elixir",
    --"typescript", "tsx", "css",
    --"python",
    --"rust",
    --"markdown", "yaml"
},

  -- Install parsers synchronously (only applied to `ensure_installed`)
  -- sync_install = false,

  -- Automatically install missing parsers when entering buffer
  -- Recommendation: set to false if you don't have `tree-sitter` CLI installed locally
  -- auto_install = true,

  -- List of parsers to ignore installing (or "all")
  -- ignore_install = { "javascript" },

  ---- If you need to change the installation directory of the parsers (see -> Advanced Setup)
  -- parser_install_dir = "/some/path/to/store/parsers", -- Remember to run vim.opt.runtimepath:append("/some/path/to/store/parsers")!

  highlight = {
    enable = true,

    -- NOTE: these are the names of the parsers and not the filetype. (for example if you want to
    -- disable highlighting for the `tex` filetype, you need to include `latex` in this list as this is
    -- the name of the parser)
    -- list of language that will be disabled
    -- disable = { "c", "rust" },

    -- Or use a function for more flexibility, e.g. to disable slow treesitter highlight for large files
    disable = function(lang, buf)
        local max_filesize = 100 * 1024 -- 100 KB
        local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
        if ok and stats and stats.size > max_filesize then
            return true
        end
    end,

    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    -- additional_vim_regex_highlighting = false,

    -- note: I had an issue where putting an "(" in quotes in a python source
    -- file would ruin the auto indenting for everything afterwards adding
    -- python to this config fixed that
    additional_vim_regex_highlighting = {"python", "typescript"},
  },
  autotag = {
    enable = true
  }
}

require("mason").setup()



-- Setup language servers. (updated this, now it requires neovim >=0.11
--vim.diagnostic.config({
--  virtual_text = {
--    --prefix = "●", -- You can change the symbol
--    spacing = 4,
--  },
--  signs = true,
--  underline = true,
--  update_in_insert = false, -- Optional: update diagnostics in insert mode
--})
--
--vim.lsp.enable('elixirls')
--vim.lsp.config('elixirls', {
--  cmd = { "/nix/store/wyqliwbiklr8wyw2h7av33chcqfxxf0l-elixir-ls-0.24.1/bin/elixir-ls" };
--})
--
--vim.lsp.enable('rust_analyzer')
--vim.lsp.config('rust_analyzer', {
--  settings = {
--    ['rust-analyzer'] = {
--      diagnostics = {
--        enable = false;
--      }
--    }
--  }
--})
--
--local on_attach = function(client, bufnr)
--  if client.server_capabilities.documentFormattingProvider then
--    vim.api.nvim_command [[augroup Format]]
--    vim.api.nvim_command [[autocmd! * <buffer>]]
--    vim.api.nvim_command [[autocmd BufWritePre <buffer> lua vim.lsp.buf.format()]]
--    vim.api.nvim_command [[augroup END]]
--  end
--end
--
--
--vim.lsp.enable('pylsp')
--vim.lsp.config('pylsp', {
--  settings = {
--    pylsp = {
--      plugins = {
--        pycodestyle = {
--          ignore = {'E501', 'W391'},
--          maxLineLength = 120
--        }
--      }
--    }
--  }
--})
--
--vim.lsp.enable('biome')
--vim.lsp.config('biome', {
--  cmd = { "/nix/store/fhzxbp4pn1qzl18cq08jq4dj152bmmyx-nodejs-22.9.0/bin/node", "/Users/zacherychin/Software/lang/node/node_modules/@biomejs/biome/bin/biome", "lsp-proxy" },
--})
--
---- vim.lsp.set_log_level("debug")
--
--vim.lsp.enable('ts_ls')
--vim.lsp.config('ts_ls', {
--  on_attach = on_attach,
--  --filetypes = {"typescript", "typescriptreact", "typescript.tsx"},
--  cmd = { "/nix/store/fhzxbp4pn1qzl18cq08jq4dj152bmmyx-nodejs-22.9.0/bin/node", "/Users/zacherychin/Software/lang/node/node_modules/.bin/typescript-language-server", "--stdio" },
--})
--
--
---- Global mappings.
---- See `:help vim.diagnostic.*` for documentation on any of the below functions
--vim.keymap.set('n', '<space>e', vim.diagnostic.open_float)
--vim.keymap.set('n', '[d', vim.diagnostic.goto_prev)
--vim.keymap.set('n', ']d', vim.diagnostic.goto_next)
--vim.keymap.set('n', '<space>q', vim.diagnostic.setloclist)
--
--
--vim.api.nvim_create_autocmd('lspattach', {
--  group = vim.api.nvim_create_augroup('my.lsp', {}),
--  callback = function(args)
--    local client = assert(vim.lsp.get_client_by_id(args.data.client_id))
--    local opts = { buffer = args.buf }
--
--    vim.keymap.set('n', 'gD', vim.lsp.buf.declaration, opts)
--    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
--    if client:supports_method('textdocument/implementation') then
--      -- create a keymap for vim.lsp.buf.implementation ...
--      vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, opts)
--    end
--
--    -- enable auto-completion. note: use ctrl-y to select an item. |complete_ctrl-y|
--    if client:supports_method('textdocument/completion') then
--      -- optional: trigger autocompletion on every keypress. may be slow!
--      -- local chars = {}; for i = 32, 126 do table.insert(chars, string.char(i)) end
--      -- client.server_capabilities.completionprovider.triggercharacters = chars
--
--      --vim.lsp.completion.enable(true, client.id, args.buf, {autotrigger = true})
--    end
--    -- auto-format ("lint") on save.
--    -- usually not needed if server supports "textdocument/willsavewaituntil".
--    if not client:supports_method('textdocument/willsavewaituntil')
--        and client:supports_method('textdocument/formatting') then
--      vim.api.nvim_create_autocmd('bufwritepre', {
--        group = vim.api.nvim_create_augroup('my.lsp', {clear=false}),
--        buffer = args.buf,
--        callback = function()
--          vim.lsp.buf.format({ bufnr = args.buf, id = client.id, timeout_ms = 1000 })
--        end,
--      })
--    end
--  end,
--})
-- Code Companion AI integration
--require("codecompanion").setup({
--  adapters = {
--    openai = function()
--      return require("codecompanion.adapters").extend("openai", {
--        schema = {
--          model = {
--            default = "o3-mini"
--            -- default = "gpt-4o-2024-11-20"
--          },
--        },
--      })
--    end,
--  },
--  strategies = {
--    chat = {
--      adapter = "openai",
--    },
--    inline = {
--      adapter = "openai",
--    },
--  },
--})
--vim.keymap.set({ "n", "v" }, "<LocalLeader>c", "<cmd>CodeCompanionChat Toggle<cr>", { noremap = true, silent = true })
--
---- Setup nvim-cmp to use with Code Companion
--local cmp_status, cmp = pcall(require, "cmp")
--if cmp_status then
--  cmp.setup({
--    mapping = cmp.mapping.preset.insert({
--      ["<C-b>"] = cmp.mapping.scroll_docs(-4),
--      ["<C-f>"] = cmp.mapping.scroll_docs(4),
--      ["<C-Space>"] = cmp.mapping.complete(),
--      ["<C-e>"] = cmp.mapping.abort(),
--      ["<CR>"] = cmp.mapping.confirm({ select = false }),
--      -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
--    }),
--  })
--end
