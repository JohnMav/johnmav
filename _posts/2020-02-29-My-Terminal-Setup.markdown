---
layout: post
title:  "My Terminal Setup"
date: 2020-02-29 15:17:00 +0800
categories: terminal, tech
---

Most developers and engineers that I have met have dabbled in customizing their terminal and I've been caught between several, er, "spirited debates" on what customizations, plugins, tools, etc are better. This isn't my attempt to convince you that my specific set up is the best. If anything this is just to help me remember how I like to setup my terminal whenever I get a new laptop 😅. 

Before we get ahead of ourselves, I've tried a few other terminal tools like iTerm, Hyperterminal, etc... and while the feature sets of these are nice, I never find myself using them to their full extent. I've found the vanilla terminal app with zsh on my mac satisfies just about all my needs.

So let's get into it! Here is my current setup! 

![Image of my terminal](/assets/img/TerminalSnapshot.png)

For customizing my terminal like this I first install [Oh My ZSH](https://ohmyz.sh/). This is a great framework that provides a ton of community developed plugins and themes. Some themes are absolutely beautiful 
and some of the plugins are must haves if you work a lot with a specific tool. 

Installing
```bash
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Currently I'm running the [Spaceship Prompt](https://denysdovhan.com/spaceship-prompt/) and [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts/blob/master/readme.md) for all the icons. 

It's pretty easy to get these all set up 

Install the Spaceship Prompt and symlink the theme 
```bash
$ git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt"
$ ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

Then pick a nerd font to install, add it to your systems fontbook and in your terminal's settings pick the new font as the default. 

![Terminal Preferences](/assets/img/TerminalPreferences.png)

Next, we configure our `~/.zshrc` file. Currently this is my setup

```bash
# If you come from bash you might have to change your $PATH.
export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to my oh-my-zsh installation.
export ZSH="/Users/John/.oh-my-zsh"

# Prompt
ZSH_THEME="spaceship"
SPACESHIP_PROMPT_ADD_NEWLINE="true"
SPACESHIP_CHAR_PREFIX='\ufbdf '
SPACESHIP_CHAR_PREFIX_COLOR='yellow'
SPACESHIP_CHAR_SUFFIX=(" ")
SPACESHIP_CHAR_COLOR_SUCCESS="yellow"
SPACESHIP_CHAR_SYMBOL='~'
SPACESHIP_PROMPT_DEFAULT_PREFIX="$USER"
SPACESHIP_PROMPT_FIRST_PREFIX_SHOW="true"
SPACESHIP_VENV_COLOR="magenta"
SPACESHIP_VENV_PREFIX="("
SPACESHIP_VENV_SUFFIX=")"
SPACESHIP_VENV_SYMBOL='\uf985'
SPACESHIP_USER_SHOW="true"
SPACESHIP_DOCKER_SYMBOL='\ue7b0'
SPACESHIP_DOCKER_VERBOSE='false'
SPACESHIP_BATTERY_SHOW='always'
SPACESHIP_BATTERY_SYMBOL_DISCHARGING='\uf57d'
SPACESHIP_BATTERY_SYMBOL_FULL='\uf583'
SPACESHIP_BATTERY_SYMBOL_CHARGING='\uf588'


## colorls configuration
source $(dirname $(gem which colorls))/tab_complete.sh

# Add wisely, as too many plugins slow down shell startup.
plugins=(git docker kubectl)

# Show Path
alias path='echo -e ${PATH//:/\\n}'

# Show available commands
alias ls="colorls"
alias la="cat ~/.zshrc | grep alias | cut -c 7-"
alias lf="cat ~/.zshrc | grep function | cut -c 7-"
function plugins() {
  echo howdoi \n task \n lolcat \n ag \n googler \n jrnl \n jira
}

# become root #
alias root='sudo -i'
alias su='sudo -i'

# Configuration
alias zshconfig="code ~/.zshrc"
alias ohmyzsh="code ~/.oh-my-zsh"
alias chrome="open -a \"Google Chrome\""
alias gitconfig="code ~/.gitconfig"

# Navigation
## get rid of command not found ##
alias cd..='cd ..'

## a quick way to get out of current directory ##
alias ..='cd ..'
alias ...='cd ../../../'
alias ....='cd ../../../../'
alias .....='cd ../../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../..'

# Setup quick local server in cwd
alias pythonserver="python -m SimpleHTTPServer"

# FileSearch
function f() { find . -iname "*$1*" ${@:2} }
function r() { grep "$1" ${@:2} -R . }

source $ZSH/oh-my-zsh.sh
```

There you have it! I'll probably spend some time writing about some of the helper functions I've created here and some of the plugins I like to use. For now this is just an initial overview of my terminal setup! Look forward to future posts about my development environment.



