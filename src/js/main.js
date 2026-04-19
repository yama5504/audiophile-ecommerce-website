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
    setupMenuToggle()

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

//SPメニューの表示・非表示を切り替える設定
function setupMenuToggle() {
    const menuBtn = document.querySelector(".menu-btn")
    const menuSp = document.querySelector(".menu-sp")
    const overlay = document.querySelector(".modal-overlay")

    if (!menuBtn || !menuSp) return

    menuBtn.addEventListener("click", () => {
        const isActive = menuSp.classList.toggle("active")
        menuBtn.classList.toggle("open") // ハンバーガーアイコンの変形用

        // オーバーレイの表示状態をメニューに同期
        if (overlay) {
            if (isActive) {
                overlay.classList.add("active")
            } else {
                overlay.classList.remove("active")
            }
        }
    })

    // メニュー側からのオーバーレイ制御
    if (overlay) {
        overlay.addEventListener("click", () => {
            menuSp.classList.remove("active")
            menuBtn.classList.remove("open")
            overlay.classList.remove("active")
        })
    }
}

init()