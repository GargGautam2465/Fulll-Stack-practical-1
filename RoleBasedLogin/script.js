function login(role) {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value.trim();
    const error = document.getElementById("error");

    if (username === "") {
        error.textContent = "Please enter a username first.";
        usernameInput.focus();
        return;
    }

    error.textContent = "";

    // Hide login and show dashboard
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboardPage").classList.remove("hidden");

    // Set user information
    document.getElementById("navUsername").textContent = username;
    document.getElementById("navRole").textContent = role;
    document.getElementById("avatar").textContent = username.charAt(0).toUpperCase();
    document.getElementById("welcome").textContent = `Welcome, ${username}!`;
    document.getElementById("welcomeText").textContent =
        `You are logged in as ${role}.`;

    const roleBadge = document.getElementById("roleBadge");
    roleBadge.textContent = role.toUpperCase();

    const deleteButtons = document.querySelectorAll(".delete-post");
    const viewerNotice = document.getElementById("viewerNotice");

    if (role === "Admin") {
        // Admin can delete posts
        deleteButtons.forEach(button => button.classList.remove("hidden"));
        viewerNotice.classList.add("hidden");
    } else {
        // Viewer has read-only access
        deleteButtons.forEach(button => button.classList.add("hidden"));
        viewerNotice.classList.remove("hidden");
    }
}

function deletePost(button) {
    const post = button.closest(".post");
    post.style.opacity = "0";
    post.style.transform = "scale(.95)";

    setTimeout(() => {
        post.remove();
    }, 250);
}

function logout() {
    document.getElementById("dashboardPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");

    document.getElementById("username").value = "";
    document.getElementById("error").textContent = "";

    // Restore deleted posts by refreshing the page state
    location.reload();
}
