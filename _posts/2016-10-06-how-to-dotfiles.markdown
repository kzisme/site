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
upon GNU Stow(Add link here). 

Stow requires that you create a new directory within your ~/ directory where
all of your dotfiles will be moved to.  I went ahead and named mine
"dotfiles".

## Creating dotfiles directory

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
