---
layout: post
title:  "Dotfile management with GNU Stow"
date:   2016-04-16 23:32:21
categories: jekyll post
---

When first getting a new system most people take some time to move all of their configuration files to their new machine.  This requires creating symlinks manually, and then verisoning the original directories so that the symlinkscan point to the correct origin.  Generally all of your configuration files sit within your ~/ directory.  As you can see below it can become quite messy with each new program you try out.

## Default ~/ setup

{% highlight sh %}
~/
+
|-- .vim
|-- .vimrc
|
|
|-- .bashrc
|-- .bash_aliases
|-- .bash_profile
+
{% endhighlight %}

A common solution to cleaning up your dotfiles is to use symbolic links to
link all of your configuration files within a single folder to your ~/ directory.
Quite often this task can be quite frustrating, but recently I stumbled
upon [GNU Stow](https://www.gnu.org/software/stow/).  In short, Stow is a utility that automates
symlinking directories for you in a quick no-nonsense manner.

To make things even easier - using Git in tandem with stow allows you to pick
and choose specific dotfiles per machine and only ~stow~ the ones you need.  

Stow requires that you create a new directory within your ~/ directory where
all of your dotfiles will be moved to.  I went ahead and named mine
"dotfiles".

At this point in time you may also choose your favorite version control system to
backup all of your dotfiles.  For me, that happens to be Git.

### Creating a new directory and initializing Git

{% highlight sh %}
mkdir dotfiles 
cd dotfiles
git init
{% endhighlight %}


{% highlight sh %}
~/
+
|-- dotfiles
|-- .vim
|-- .vimrc
|
|
|-- .bashrc
|-- .bash_aliases
+
{% endhighlight %}

After the new directory has been created you can begin creating an
individual directory for each program that requires a configuration file.  (I
just happen to only have a few in this example)
Then you can begin moving all of your dotfiles into their respective folders
using the move command.

{% highlight sh %}
  mv ~/Users/kzisme/.vimrc ~/Users/kzisme/dotfiles/vim/.vimrc
  mv ~/Users/kzisme/.bashrc ~/Users/kzisme/dotfiles/bash/.bashrc
  mv ~/Users/kzisme/.bash_aliases ~/Users/kzisme/dotfiles/bash/.bash_aliases
{% endhighlight %}

{% highlight sh %}
~/dotfiles
+
|-- dotfiles
|   -- /vim
|       -- .vimrc
|   -- /bash
|       -- .bashrc
|       -- .bash_aliases
+
{% endhighlight %}

To start using Stow your working directory must be the ~/dotfiles directory.

Finally you can make use of Stow by running

{% highlight sh %}
stow <directoryname>
{% endhighlight %}

{% highlight sh %}
stow vim
stow bash
{% endhighlight %}

This will automatically create symbolic links for each program within your ~/
directory, but will keep all of your configuration files wrapped up nicely
within your new dotfiles directory.  

{% highlight sh %}
~/Users/kzisme
+
|-- dotfiles <-- All files are within here
|-- .vim
|-- .vimrc ~symlinked~
|
|
|-- .bashrc ~symlinked~
|-- .bash_aliases ~symlinked~
+
{% endhighlight %}

### Un-Stowing 
In some instances you may want to remove the symlink you have created
previously.  That can be done by passing the -D flag to Stow.

{% highlight sh %}
stow -D vim
{% endhighlight %}

{% highlight sh %}
~/Users/kzisme
+
|-- dotfiles <-- All files are within here
|-- .vim
|-- .vimrc -symlink removed-
|
|
|-- .bashrc ~symlinked~
|-- .bash_aliases ~symlinked~
+
{% endhighlight %}





