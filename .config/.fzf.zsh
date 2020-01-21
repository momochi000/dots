# Setup fzf
# ---------
if [[ ! "$PATH" == */home/ec2-user/.fzf/bin* ]]; then
  export PATH="${PATH:+${PATH}:}/home/ec2-user/.fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/home/ec2-user/.fzf/shell/completion.zsh" 2> /dev/null

# Key bindings
# ------------
source "/home/ec2-user/.fzf/shell/key-bindings.zsh"
