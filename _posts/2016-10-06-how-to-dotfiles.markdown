---
layout: post
title:  "Dotfile management"
date:   2016-04-06 23:32:21
categories: jekyll update
---

When I first starting using OSX configuring everything to my liking was the
first thing I wanted to do.  A common way of keeping track of your dotfiles is making use of git.  Generally all of your configuration files sit within your ~/home directory.  As you can see below it can become quite messy.

## Default ~/ setup

```
~/Users/user
+
|-- .vim
|-- .vimrc
|
|-- .bashrc
|-- .bash_aliases
|-- .bash_profile
+
```

A common solution to cleaning up your dotfiles is to use symbolic links to
link all of your configuration files within a folder to your ~/ directory.
Quite often this task can become a small project by itself, so I stumbled
upon GNU Stow(Add link here).  In short, stow is a utility that automates
symlinking directories for you in a quick and easy manner.

To make things even easier - using Git in tandem with stow allows you to pick
and choose specific dotfiles per machine and only ~stow~ the ones you need.  

When I first began using a unix based system it was beneficial to keep my
dotfiles all in one place, but when I wanted to backup all of my dotfiles using
git...it became a time sink.

Stow requires that you create a new directory within your ~/ directory where
all of your dotfiles will be moved to.  I went ahead and named mine
"dotfiles".

At this point in time you may also choose your favorite versioning system to
backup all of your dotfiles.  For be, that happens to be Git.


## Creating dotfiles directory


### Setting up version control
> mkdit dotfiles 
cd dotfiles
git init

```
~/Users/user
+
|-- dotfiles
|-- .vim
|
|-- .bashrc
|-- .bash_aliases
+
```

After the new directory has been created you can begin creating an
individual directory for each program that requires a configuration file.
Then you can begin moving all of your dotfiles into their respective folders.

```
~/Users/user
+
|-- dotfiles
|   -- /vim
|       -- .vimrc
|   -- /bash
|       -- .bashrc
|       -- .bash_aliases
+
```

Next you must be be within the ~/dotfiles directory 

Then you can run...

```
stow vim
stow bash
```

This will automatically create symbolic links for you within your ~/
directory, but will keep all of your configuration files wrapped up nicely
within your new dotfiles directory.  
