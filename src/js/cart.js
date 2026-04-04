// 共通処理
export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || []
}

export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// カート追加
export const addToCart = (product, qty) => {
    const cart = getCart()
    const existing = cart.find(item => String(item.id) === String(product.id))

    if (existing) {
        existing.quantity += qty
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image.mobile,
            quantity: qty
        })
    }

    saveCart(cart)
}

// 数量変更
export const updateQuantity = (id, newQty) => {
    const cart = getCart()
    const item = cart.find(i => i.id === id)

    if (item) item.quantity = newQty

    saveCart(cart)
}

// 削除
export const removeItem = (id) => {
    const cart = getCart()
    const newCart = cart.filter(item => String(item.id) !== String(id))

    saveCart(newCart)
}

// 合計金額
export const getTotal = () => {
    const cart = getCart()

    return cart.reduce((sum, item) => {
        return sum + item.price * item.quantity
    }, 0)
}

// 全削除（購入）
export const clearCart = () => {
    localStorage.removeItem("cart")
}