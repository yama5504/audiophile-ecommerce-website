export async function loadComponent(selector, path) {
    const response = await fetch(path)
    if (!response.ok) {
        console.error("Component load failed:", path)
        return
    }
    const html = await response.text()
    document.querySelector(selector).innerHTML = html
}