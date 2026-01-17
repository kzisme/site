const html = document.documentElement;
const body = document.body;
const modeToggle = document.getElementById("mode-toggle");

function setMode(mode) {
  if (mode === "dark") {
    html.classList.add("dark-mode");
    html.classList.remove("light-mode");
  } else {
    html.classList.add("light-mode");
    html.classList.remove("dark-mode");
  }
  localStorage.setItem("preferredMode", mode);
}

function loadSavedMode() {
  const savedMode = localStorage.getItem("preferredMode");
  if (savedMode) {
    setMode(savedMode);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? "dark" : "light");
  }
  html.style.visibility = '';
}

function applyInitialMode() {
  const savedMode = localStorage.getItem("preferredMode");
  if (savedMode === "dark" || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add("dark-mode");
  }
  html.style.visibility = 'hidden';
}

modeToggle.addEventListener("click", () => {
  setMode(html.classList.contains("dark-mode") ? "light" : "dark");
});

// Panggil applyInitialMode segera
applyInitialMode();

// Panggil loadSavedMode setelah DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedMode);
} else {
  loadSavedMode();
}

// Scramble effect for .scramble-link (black/white, word scramble on hover/focus)
document.addEventListener('DOMContentLoaded', () => {
  const scrambleLinks = document.querySelectorAll('.scramble-link');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  scrambleLinks.forEach(link => {
    let original = link.textContent;
    let frame = 0;
    let scrambleId = null;

    function randomChar() {
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function scramble() {
      let output = '';
      for (let i = 0; i < original.length; i++) {
        // Only scramble letters/numbers, preserve spaces/punctuation
        if (/[A-Za-z0-9]/.test(original[i])) {
          output += Math.random() < 0.5 ? randomChar() : original[i];
        } else {
          output += original[i];
        }
      }
      link.textContent = output;
      frame++;
      if (frame < 16) {
        scrambleId = setTimeout(scramble, 30);
      } else {
        link.textContent = original;
        frame = 0;
      }
    }

    function startScramble() {
      if (scrambleId) clearTimeout(scrambleId);
      original = link.textContent;
      frame = 0;
      scramble();
    }

    link.addEventListener('mouseenter', startScramble);
    link.addEventListener('focus', startScramble);
    link.addEventListener('mouseleave', () => {
      if (scrambleId) clearTimeout(scrambleId);
      link.textContent = original;
      frame = 0;
    });
    link.addEventListener('blur', () => {
      if (scrambleId) clearTimeout(scrambleId);
      link.textContent = original;
      frame = 0;
    });
  });
});
