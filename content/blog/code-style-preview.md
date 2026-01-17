---
title: Code Style & Scramble Effect Preview
description: See how code blocks and a custom scramble effect render with your current CSS.
date: 2025-09-16
tags: blog, code, effects
---

# Code Block Rendering

Below are some example code blocks in different languages and styles.

## JavaScript

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet('World');
```

## CSS

```css
.scramble {
  display: inline-block;
  font-family: monospace;
  color: #e83e8c;
  background: #222;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  transition: color 0.2s;
}
```

## HTML

```html
<span class="scramble" id="scramble-demo">Scramble Me!</span>
```

## Diff Example

```diff-js
-  let oldValue = 1;
+  let newValue = 2;
```

---

# Scramble Effect Demo

Below is a live demo of the "scramble" effect. Hover or tap to see the effect.

<span class="scramble" id="scramble-demo">Scramble Me!</span>

<script>
/**
 * Minimal Scramble Effect
 * (JS can be moved to a separate file if desired)
 */
(function() {
  const el = document.getElementById('scramble-demo');
  if (!el) return;
  const original = el.textContent;
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let frame = 0, scrambleId = null;

  function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function scramble() {
    let output = '';
    for (let i = 0; i < original.length; i++) {
      output += Math.random() < 0.5 ? randomChar() : original[i];
    }
    el.textContent = output;
    frame++;
    if (frame < 20) {
      scrambleId = setTimeout(scramble, 30);
    } else {
      el.textContent = original;
      frame = 0;
    }
  }

  el.addEventListener('mouseenter', () => {
    if (scrambleId) clearTimeout(scrambleId);
    frame = 0;
    scramble();
  });
  el.addEventListener('touchstart', () => {
    if (scrambleId) clearTimeout(scrambleId);
    frame = 0;
    scramble();
  });
})();
</script>

<style>
.scramble {
  display: inline-block;
  font-family: monospace;
  color: #e83e8c;
  background: #222;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  transition: color 0.2s;
  cursor: pointer;
}
.scramble:active, .scramble:focus, .scramble:hover {
  color: #fff;
  background: #e83e8c;
}
</style>

---

You can now see how code blocks and interactive effects look with your current theme and CSS.