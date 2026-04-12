import '../styles/reset.css'
import '../styles/style.scss'


import { loadComponent } from "./component-loader.js"
import { renderCart, initCartEvents, renderCheckoutSummary } from "./cart-ui.js"
async function init() {
    await loadComponent("#header", "./assets/components/header.html")
    await loadComponent("#footer", "./assets/components/footer.html")
    await loadComponent(".category-list", "./assets/components/category-list.html")
    await loadComponent(".about", "./assets/components/about.html")

    initCartEvents()
    renderCart()
    setupCartToggle()

    // チェックアウトページだった場合、サマリーを描画
    if (document.querySelector(".checkout-page")) {
        renderCheckoutSummary()
    }
}


//カートモーダルの表示・非表示を切り替える設定
function setupCartToggle() {
    const cartBtn = document.querySelector(".cart-btn")
    const cartModal = document.querySelector(".cart-modal")
    const overlay = document.querySelector(".modal-overlay")

    // 要素が見つからない場合はスキップ（エラー防止）
    if (!cartBtn || !cartModal) return

    // カートアイコンクリックで開閉
    cartBtn.addEventListener("click", () => {
        cartModal.classList.toggle("active")
        if (overlay) overlay.classList.toggle("active")
    })

    // 背景（オーバーレイ）をクリックしたら閉じる
    if (overlay) {
        overlay.addEventListener("click", () => {
            cartModal.classList.remove("active")
            overlay.classList.remove("active")
        })
    }
}

init()