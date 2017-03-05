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

Once you have a word document to work with as a template document for inserting 
text into you can begin adding bookmarks to the document.  These booksmarks
will act as insert points within your code.  

What I normally do is select the placeholder text I want to overwrite, and then
insert a bookmark at that point (while taking note of the name I used for the
bookmark).

Since the document you are inserting text into is acting as a template it is
necessary to first make a copy of the document before altering it.  If you
don't - you will be deleting the bookmarks you created for every document after
the first.

I normally setup class level variables to hold the directories where the
copying of the template is done, and where the populating of the copied
document is done.  

// I pass in the class level variable containing the file path for the copied
// file to check if a copy already exists.
if (_sOriginDirectoryPath.Contains("copy"))
{
    WriteLogFile("Found A Copy  - Deleting It");
    File.Delete(sGoodbyeLetterPath);
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
return sWorkDirectory + "\\" + sBorrowerFirstName + "_" + sSubServicerLoanNumber + "_GoodByeLetter.pdf";


































