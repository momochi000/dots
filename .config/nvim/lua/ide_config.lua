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



-- Setup language servers.
local lspconfig = require('lspconfig')
--lspconfig.elixirls.setup{
--  cmd = { "/Users/zchin/.local/share/nvim/mason/bin/elixir-ls" };
--}

--lspconfig.rust_analyzer.setup{
--  settings = {
--    ['rust-analyzer'] = {
--      diagnostics = {
--        enable = false;
--      }
--    }
--  }
--}

local on_attach = function(client, bufnr)
  if client.server_capabilities.documentFormattingProvider then
    vim.api.nvim_command [[augroup Format]]
    vim.api.nvim_command [[autocmd! * <buffer>]]
    vim.api.nvim_command [[autocmd BufWritePre <buffer> lua vim.lsp.buf.format()]]
    vim.api.nvim_command [[augroup END]]
  end
end

-- lspconfig.pyright.setup {}
--lspconfig.tsserver.setup {
  --on_attach = on_attach,
  --filetypes = {"typescript", "typescriptreact", "typescript.tsx"},
  --cmd = { "typescript-langugage-server", "--stdio" }
--}


-- Global mappings.
-- See `:help vim.diagnostic.*` for documentation on any of the below functions
vim.keymap.set('n', '<space>e', vim.diagnostic.open_float)
vim.keymap.set('n', '[d', vim.diagnostic.goto_prev)
vim.keymap.set('n', ']d', vim.diagnostic.goto_next)
vim.keymap.set('n', '<space>q', vim.diagnostic.setloclist)

-- Use LspAttach autocommand to only map the following keys
-- after the language server attaches to the current buffer
vim.api.nvim_create_autocmd('LspAttach', {
  group = vim.api.nvim_create_augroup('UserLspConfig', {}),
  callback = function(ev)
    -- Enable completion triggered by <c-x><c-o>
    vim.bo[ev.buf].omnifunc = 'v:lua.vim.lsp.omnifunc'

    -- Buffer local mappings.
    -- See `:help vim.lsp.*` for documentation on any of the below functions
    local opts = { buffer = ev.buf }
    vim.keymap.set('n', 'gD', vim.lsp.buf.declaration, opts)
    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
    vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
    vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, opts)
    vim.keymap.set('n', '<C-k>', vim.lsp.buf.signature_help, opts)
    vim.keymap.set('n', '<space>wa', vim.lsp.buf.add_workspace_folder, opts)
    vim.keymap.set('n', '<space>wr', vim.lsp.buf.remove_workspace_folder, opts)
    vim.keymap.set('n', '<space>wl', function()
      print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
    end, opts)
    vim.keymap.set('n', '<space>D', vim.lsp.buf.type_definition, opts)
    vim.keymap.set('n', '<space>rn', vim.lsp.buf.rename, opts)
    vim.keymap.set({ 'n', 'v' }, '<space>ca', vim.lsp.buf.code_action, opts)
    vim.keymap.set('n', 'gr', vim.lsp.buf.references, opts)
    vim.keymap.set('n', '<space>f', function()
      vim.lsp.buf.format { async = true }
    end, opts)
  end,
})

-- Code Companion AI integration
--require("codecompanion").setup({
--  adapters = {
--    openai = function()
--      return require("codecompanion.adapters").extend("openai", {
--        schema = {
--          model = {
--            -- default = "gpt-4o-2024-11-20"
--            default = "gpt-4-turbo-2024-04-09"
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
