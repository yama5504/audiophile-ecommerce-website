export async function loadComponent(selector, path) {
    const target = document.querySelector(selector);
    if (!target) {
        return; 
    }

    const response = await fetch(path)
    if (!response.ok) {
        console.error("Component load failed:", path)
        return
    }
    const html = await response.text()
    target.innerHTML = html
}