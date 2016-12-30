---
layout: post
title:  "C# Working With Word Documents"
date:   2016-12-03 20:37:21
categories: jekyll post
---
For many people working with C#/.NET automating the creation of word documents
was a painful process to figure out for me initially.

I chose to use the Microsoft.Office.Interop.Word COM assembly to generate
documents.  I'm sure there are other ways to do this, but this was the most
straight forward way I found.

The only issue with this approach is that it is required to have Word installed 
on the machine that the program will be running on.


