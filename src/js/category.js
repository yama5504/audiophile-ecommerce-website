import data from "../data/data.json"

const params = new URLSearchParams(window.location.search)
const category = params.get("category")

const title = document.querySelector(".category-title")
const container = document.querySelector(".product-list")

title.textContent = category.toUpperCase()

const products = data
.filter(product => product.category === category)
.sort((a, b) => a.categoryOrder - b.categoryOrder)

products.forEach((product, index) => {
    const reverse = index % 2 === 1 ? "reverse" : ""
    container.innerHTML += `
    <div class="product-card ${reverse}">
        <picture>
            <source media="(min-width:1440px)" srcset="${product.categoryImage.desktop}">
            <source media="(min-width:768px)" srcset="${product.categoryImage.tablet}">
            <img src="${product.categoryImage.mobile}" alt="${product.name}">
        </picture>

        <div class="text-wrap">
            ${product.new ? `<p class="overline">NEW PRODUCT</p>` : ""}
            <h2>${product.name}</h2>
            <p class="description">${product.description}</p>
            <a class="cv-btn" href="">SEE PRODUCT</a>
        </div>
    </div>
    `
})