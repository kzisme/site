---
layout: post
title:  "C# Working With Word Documents"
date:   2017-04-03 21:09:21
categories: jekyll post
---
While working with  C#/.NET automating  the creation of word documents
was a painful process to figure out initially.  The great part about using word
automation is that it frees up other people's time who previously had to
spend time on these repititive tasks on a daily basis. 

I chose to use the Microsoft.Office.Interop.Word COM assembly to generate
documents.  The only issue with this approach is that it is 
required to have Word installed on the machine that the program will be running 
on.

Once you have a word document(.docx format) to work with as a template document 
for inserting text into you can begin adding bookmarks to the document.  
These booksmarks will act as insert points within your code.  

What I normally do is select the placeholder text I want to overwrite, and then
insert a bookmark at that point (while taking note of the name I used for the
bookmark).  In Word 2016 the bookmark functionality can be found under the
"Insert" menu.  Whatever text (or wherever your cursor currently is) you
currently have hilighted is where the bookmark will be created.  This text will
also be replaced when inserting text into the bookmark.

Since the document you are inserting text into is acting as a template it is
necessary to first make a copy of the document before altering it.  If you
don't - you will be deleting the bookmarks you created for every document after
the first.

I normally setup class level variables to hold the directories where the
copying of the template is done, and where the populating of the copied
document is done.  

{% highlight c# %}
// I pass in the class level variable containing the file path for the copied
// file to check if a copy already exists.
if (_sOriginDirectoryPath.Contains("copy"))
{
    WriteLogFile("Found A Copy  - Deleting It");
    File.Delete(sOriginDirectoryPath);
}

// If we don't find a copy - create one.
File.Copy(_OriginDirectoryPath, _sWorkingDirectoryPath  + "Copy.docx");
WriteLogFile("File Copied!");

// Now we can use Microsoft.Office.Interop.Word to open and populate the file.
Application app = new Application();
Document doc = app.Documents.Open(_sWorkingDirectoryPath + "\\" + "Copy.docx");

// Now we are able to loop through each existing bookmark within the document,
// and insert text in its place.
if (doc.Bookmarks.Exists("myBookmarkName"))
{
    object oBookMark = "myBookmarkName";
    doc.Bookmarks.get_Item(ref oBookMark).Range.Text = Hello World!;
}

// Next we close the document we opened, and quit/dispose of the word
// application.
((_Document)doc).Close();
((_Application)app).Quit();

// Lastly I normally return the newly created document path to upload it to an
// FTP, Email it, or save it in a specific location.
return _sWorkingDirectoryPath`+ "\\"+ "NewPdfToSend.pdf";
{% endhighlight %}

All of the code snippet above is usually enclosed in a loop, so each iteration
you're essentially generating a document per an order and doing something with
it.    

Here are a few final tips if you're going to have more than a few bookmarks in
your document:
   
   
   - Enabling proofreading marks helps when figuring out why text isn't going
     where it's supposed to.
   - If you have to work with many bookmarks (40+) it's probably a good idea to
     create an object to pass to your function that populates your document.
   - If the structure of the document is made of columns you may have to write
     a function(s) to correctly determine the spacing/tab amounts between
     insertions.
   - You can insert multiple bookmarks in the same position - even without
     replacing text, but it makes debugging a little harder if something goes
     wrong later on when generating documents.































