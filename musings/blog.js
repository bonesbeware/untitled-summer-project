document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("post") || "1";

    try {
        const response = await fetch("posts.json");
        const posts = await response.json();

        const post = posts.find(p => p.id === postId);

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
        } else {
            document.getElementById("blog-title").textContent = "Post not found";
            document.getElementById("blog-date").textContent = "";
            document.getElementById("blog-prelude").textContent = "";
            document.getElementById("blog-body").textContent = "";
        }
    } catch (err) {
        document.getElementById("blog-title").textContent = "Error loading post";
        document.getElementById("blog-date").textContent = "";
        document.getElementById("blog-prelude").textContent = "";
        document.getElementById("blog-body").textContent = "";
    }
});