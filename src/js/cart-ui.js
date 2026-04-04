import { getCart, removeItem, updateQuantity, getTotal, clearCart } from "./cart.js"

/**
 * カートの見た目を更新する関数
 * データを変更するたびにこれを呼び出す
*/

export const renderCart = () => {
    const cart = getCart()
    const container = document.querySelector(".cart-items")
    const totalEl = document.querySelector(".total")
    const countEl = document.querySelector(".cart-count")

    // 1. 個数と合計の初期表示
    // 総アイテム数（種類数ではなく合計個数）を表示する場合
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0)
    countEl.textContent = totalQty
    totalEl.textContent = getTotal().toLocaleString()

    // 2. カートが空の場合の処理
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your cart is empty</p>'
        return
    }

    // 3. 商品リストのHTML生成（map.joinで効率化）
    const cartHtml = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-left">
                <img src="${item.image}" alt="${item.name}">
                <div class="info">
                    <p class="name">${item.name.split(' ').slice(0, -1).join(' ')}</p>
                    <p class="price">$ ${item.price.toLocaleString()}</p>
                </div>
            </div>

            <div class="qty">
                <button type="button" class="qty-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button type="button" class="qty-btn plus" data-id="${item.id}">+</button>
            </div>
        </div>
        `).join('')
        container.innerHTML = cartHtml
}

/**
 * カート内のボタン操作（＋、ー、全削除、チェックアウト）を登録する関数
 * ページの初期化時に「一度だけ」実行する
 */
export const initCartEvents = () => {
    const container = document.querySelector(".cart-items")
    const clearBtn = document.querySelector(".clear-btn")
    const checkoutBtn = document.querySelector(".checkout-btn")

    // 1. 数量の増減（イベント委譲）
    container.addEventListener("click", (e) => {
        const btn = e.target.closest('.qty-btn')
        if (!btn) return

        const id = btn.dataset.id
        const cart = getCart()
        // IDが数値か文字列か不明な場合に対応
        const item = cart.find(i => String(i.id) === String(id))

        if (btn.clasList.contains("plus")) {
            updateQuantity(id, item.quantity + 1)
        }
        else if (btn.clasList.contains("minus")) {
            if (item.quantity > 1) {
                updateQuantity(id, item.quantity - 1)
            } else {
                // 1個の状態でマイナスを押したら削除
                removeItem(id)
            }
        }

        renderCart() // 状態が変わったので再描画
    })

    // 2. Remove all（全削除）
    clearBtn.addEventListener("click", () => {
        if (getCart().length === 0) return
        if (confirm("Are you sure you want to remove all items?")) {
            clearCart()
            renderCart()
        }
    })

    // 3. CHECKOUT（チェックアウト）
    checkoutBtn.addEventListener("click", () => {
        const cart = getCart()
        if (cart.length === 0) {
            alert("Your cart is empty!")
            return
        }

        // チェックアウトページ（checkout.htmlなど）へ移動
        window.location.href = "./checkout.html"
    })
}