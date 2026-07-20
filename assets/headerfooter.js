async function inject(url, selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        el.innerHTML = await res.text();
    } catch (err) {
        console.error("Could not load " + url, err);
    }
}

function markCurrent() {
    const path = window.location.pathname;
    document.querySelectorAll("header nav a").forEach(link => {
        if (path === link.getAttribute("href")) {
            link.setAttribute("aria-current", "page");
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await inject("/header-footer/header.html", "header");
    markCurrent();
    inject("/header-footer/footer.html", "footer");
});