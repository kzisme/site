To make JavaScript and CSS active on the entire website, place your global CSS in `public/css/brutal.css` and your global JavaScript in `public/js/brutal.js`. These files are included on every page via the base template `_includes/base.njk`, so any code you add there will be loaded site-wide. You do not need to add them to each post or page individually—just update these files and your styles/scripts will be active everywhere.

# 11ty Minimal Brutalism Starter

This project is a stripped-down 11ty site using [tiny-brutalism-css](https://github.com/pruger/tiny-brutalism-css) for styling.

---

## 🏠 Editing the Homepage

- The homepage content is controlled by [`content/index.njk`](./content/index.njk).
- To change what appears at [http://localhost:8080/](http://localhost:8080/), edit `content/index.njk`.
- By default, it shows a list of the latest posts. You can add any HTML or Nunjucks code here.

---

## ✍️ Adding a New Blog Post

1. Create a new Markdown file in [`content/blog/`](./content/blog/), e.g. `content/blog/my-new-post.md`.
2. Use this frontmatter at the top:
   ```
   ---
   title: My New Post
   description: A short description.
   tags: [tag1, tag2] # Do NOT use "posts" as a tag unless you want a tag page at /blog/
   layout: post.njk
   date: 2025-08-20
   ---
   Your post content here.
   ```
3. **Important:**  
   Only use the `content/blog/` directory for your posts.  
   If you see old demo posts on your blog page, make sure there are no other blog directories (such as `themes/brutalism/content/blog/`).  
   Delete any theme demo content directories for a clean setup.

---

## 📄 Adding a New Page

1. Create a Markdown or Nunjucks file in [`content/`](./content/), e.g. `content/about.md`.
2. Use this frontmatter:
   ```
   ---
   title: About
   description: About this site.
   layout: page.njk
   ---
   Page content here.
   ```

---

## 🔗 Adding Links

- In any `.njk` or `.md` file, use standard HTML:
  ```html
  <a href="/about/">About</a>
  <a href="/blog/my-new-post/">My New Post</a>
  ```
- To add navigation links to the top menu, edit [`_data/metadata.yaml`](./_data/metadata.yaml) and update the `navbar` array.

---

## 🖼️ Base Layouts

- [`_includes/base.njk`](./_includes/base.njk): Main HTML shell, used by all pages and posts.
- [`_includes/post.njk`](./_includes/post.njk): For blog posts, inherits from `base.njk`.
- [`_includes/page.njk`](./_includes/page.njk): For static pages, inherits from `base.njk`.
- [`_includes/home.njk`](./_includes/home.njk): For the homepage.

---

## 🎨 Styling

- The site uses only [`public/css/tiny-brutalism.css`](./public/css/tiny-brutalism.css) for styling.
- To customize styles, edit or replace this CSS file.

---

## 🚀 Development

- Start the local server with your usual 11ty command (e.g., `npx @11ty/eleventy --serve`).
- Visit [http://localhost:8080/](http://localhost:8080/) to see your site.

---

## 🧹 Troubleshooting

- If you see old demo posts or pages, ensure you have deleted all theme demo content directories (like `themes/brutalism/content/blog/`).
- Only `content/blog/` should contain your posts.
- Do NOT use the tag "posts" in your blog post frontmatter unless you want a tag page at `/blog/`.
- Rebuild your site after deleting old content to refresh the output.
