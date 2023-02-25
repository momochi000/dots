{ config, pkgs, lib, ... }:
let
  home-manager = builtins.fetchTarball "https://github.com/nix-community/home-manager/archive/master.tar.gz";
in
{
  imports = [
    (import "${home-manager}/nixos")
  ];

  home-manager.users.momochi = {
    /* home manager config goes here */
    home.stateVersion = "22.11";

    home.packages = [ 
      pkgs.alacritty
      pkgs.zplug
      pkgs.zsh-powerlevel10k
    ];

    programs.neovim = {
      enable = true;
      defaultEditor = true;
      plugins = [
        pkgs.vimPlugins.nerdtree
        #pkgs.vimPlugins.neovim-sensible
        pkgs.vimPlugins.fzf-vim
        pkgs.vimPlugins.vim-nix
        pkgs.vimPlugins.oceanic-next
      ];
    };

    programs.zsh = {
      enable = true;
      initExtra = ''
        if [ -n "''${commands[fzf-share]}" ]; then
          source "$(fzf-share)/key-bindings.zsh"
          source "$(fzf-share)/completion.zsh"
        fi
      '';
      plugins = [
        {
          name = "powerlevel10k-config";
          # lib.cleanSource seems to let me reference the current directory?
          #src = lib.cleanSource ~/.p10k-config;
          src = /home/momochi/.p10k-config;
          file = "p10k.zsh";
        }
      ];
      zplug = {
        enable = true;
        plugins = [
          { 
            name = "romkatv/powerlevel10k";
            tags = [ as:theme depth:1 ];
          }
          { 
            name = "junegunn/fzf";
            tags = [ as:command ]; 
          }
          {
            name = "plugins/git";
            tags = [ from:oh-my-zsh ];
          }
        ];
      };
    };

    #environment.variables.EDITOR = "nvim";
  };
}
