import data from "../data/data.json"
import { addToCart } from "./cart"
import { renderCart } from "./cart-ui"

const params = new URLSearchParams(window.location.search)
const slug = params.get("product")

const container = document.querySelector(".product-detail")
const product = data.find(item => item.slug === slug)

if(!product) {
    container.innerHTML = "<p>商品が見つかりません</p>"
} else {
    container.innerHTML = `
    <p class="breadcrumbs">
        <a href="">Go Back</a>
    </p>
    <div class="product-top">
        <picture>
            <source media="(min-width:1440px)" srcset="${product.image.desktop}">
            <source media="(min-width:768px)" srcset="${product.image.tablet}">
            <img src="${product.image.mobile}" alt="${product.name}">
        </picture>
        <div class="text-wrap">
            ${product.new ? '<p class="overline">NEW PRODUCT</p>' : ""}
            <h1>${product.name}</h1>
            <p class="description">${product.description}</p>
            <p class="price">$<span>${product.price.toLocaleString()}</span></p>
            <div class="add-wrap">
                <div class="count">
                    <button type="button" class="qty-btn" id="minus" aria-label="数量を減らす">-</button>
                    <span id="qty-display">1</span>
                    <button type="button" class="qty-btn" id="plus" aria-label="数量を増やす">+</button>
                </div>
                <button type="button" id="add-cart-btn" class="cv-btn">ADD TO CART</button>
            </div>
        </div>
    </div>

    <div class="product-des">
        <div class="features">
            <h2>FEATURES</h2>
            <p>${product.features}</p>
        </div>

        <div class="item">
            <h2>IN THE BOX</h2>
            <ul>
                ${product.includes.map(include =>`
                    <li>
                        <span class="quantity">${include.quantity}x</span>
                        <span class="item">${include.item}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    </div>

    <div class="gallery">
        <picture>
            <source media="(min-width:1440px)" srcset="${product.gallery.first.desktop}">
            <source media="(min-width:768px)" srcset="${product.gallery.first.tablet}">
            <img src="${product.gallery.first.mobile}">
        </picture>
        <picture>
            <source media="(min-width:1440px)" srcset="${product.gallery.second.desktop}">
            <source media="(min-width:768px)" srcset="${product.gallery.second.tablet}">
            <img src="${product.gallery.second.mobile}">
        </picture>
        <picture>
            <source media="(min-width:1440px)" srcset="${product.gallery.third.desktop}">
            <source media="(min-width:768px)" srcset="${product.gallery.third.tablet}">
            <img src="${product.gallery.third.mobile}">
        </picture>
    </div>

    <div class="others">
        <h2>YOU MAY ALSO LIKE</h2>
        <ul>
            ${product.others.map(other =>`
                <li>
                    <picture>
                        <source media="(min-width:1440px)" srcset="${other.image.desktop}">
                        <source media="(min-width:768px)" srcset="${other.image.tablet}">
                        <img src="${other.image.mobile}" alt="${other.name}">
                    </picture>
                    <h3>${other.name}</h3>
                    <a class="cv-btn" href="">SEE PRODUCT</a>
                </li>
            `).join('')}
        </ul>
    </div>

    `

    // 4. HTML挿入後に要素を取得してイベントを設定
    setupProductActions(product)
}


function setupProductActions(product) {
    let qty = 1

    const plusBtn = document.querySelector("#plus")
    const minusBtn = document.querySelector("#minus")
    const qtyText = document.querySelector("#qty-display")
    const addBtn = document.querySelector("#add-cart-btn")

    plusBtn.addEventListener("click", () => {
        qty++
        qtyText.textContent = qty
    })

    minusBtn.addEventListener("click", () => {
        if (qty > 1) {
            qty--
            qtyText.textContent = qty
        }
    })

    addBtn.addEventListener("click", () => {
        // 1. データを更新
        addToCart(product, qty)
        
        // 2. ここが重要！カートのUI（モーダルの中身やバッジ）を最新にする
        renderCart() 
        
        // カートに入れたらモーダルを表示する
        const modal = document.querySelector(".cart-modal")
        const overlay = document.querySelector(".modal-overlay")

        if (modal) modal.classList.add("active")
        if (overlay) overlay.classList.add("active")
    })
}