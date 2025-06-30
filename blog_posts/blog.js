// List your blog post filenames in order
const posts = [
  "blog_one.html",
  "blog_two.html",
  "blog_three.html",
  "blog_four.html",
  "blog_five.html",
  "blog_six.html"
];

// Get the current filename
const current = window.location.pathname.split('/').pop();
const idx = posts.indexOf(current);

// Only run if we're on a blog post page
if (idx !== -1) {
  if (idx > 0) {
    const prevBtn = document.createElement('a');
    prevBtn.href = posts[idx - 1];
    prevBtn.className = 'nav-button nav-left';
    prevBtn.innerHTML = '&#x276E;';
    document.body.appendChild(prevBtn);
  }
  if (idx < posts.length - 1) {
    const nextBtn = document.createElement('a');
    nextBtn.href = posts[idx + 1];
    nextBtn.className = 'nav-button nav-right';
    nextBtn.innerHTML = '&#x276F;';
    document.body.appendChild(nextBtn);
  }
}