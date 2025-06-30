document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("post") || "1";

    try {
        const response = await fetch("posts.json");
        const posts = await response.json();

        const postIndex = posts.findIndex(p => p.id === postId);
        const post = posts[postIndex];

        if (post) {
            document.title = post.title;
            document.getElementById("blog-title").textContent = post.title;
            document.getElementById("blog-date").textContent = post.date;
            // Show prelude if it exists
            const preludeDiv = document.getElementById("blog-prelude");
            if (post.prelude) {
                preludeDiv.style.display = "block";
                preludeDiv.textContent = post.prelude;
            } else {
                preludeDiv.style.display = "none";
            }
            // Paragraph split for better formatting
            document.getElementById("blog-body").innerHTML = post.body
                .split('\n\n')
                .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
                .join('');

            // Navigation arrows
            const navLeft = document.getElementById("nav-left");
            const navRight = document.getElementById("nav-right");

            // Previous post
            if (postIndex > 0) {
                navLeft.style.display = "block";
                navLeft.onclick = () => {
                    window.location.href = `blog.html?post=${posts[postIndex - 1].id}`;
                };
            } else {
                navLeft.style.display = "none";
            }

            // Next post
            if (postIndex < posts.length - 1) {
                navRight.style.display = "block";
                navRight.onclick = () => {
                    window.location.href = `blog.html?post=${posts[postIndex + 1].id}`;
                };
            } else {
                navRight.style.display = "none";
            }

        } else {
            document.getElementById("blog-title").textContent = "Post not found";
            document.getElementById("blog-date").textContent = "";
            document.getElementById("blog-prelude").textContent = "";
            document.getElementById("blog-body").textContent = "";
            document.getElementById("nav-left").style.display = "none";
            document.getElementById("nav-right").style.display = "none";
        }
    } catch (err) {
        document.getElementById("blog-title").textContent = "Error loading post";
        document.getElementById("blog-date").textContent = "";
        document.getElementById("blog-prelude").textContent = "";
        document.getElementById("blog-body").textContent = "";
        document.getElementById("nav-left").style.display = "none";
        document.getElementById("nav-right").style.display = "none";
    }
});