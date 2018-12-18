const edit_user_profile = {
    emit: "/socket/api/editUserProfile",
    on: "/socket/api/response/editUserProfile"
}

const edit_seller_profile = {
    emit: "/socket/api/editSellerProfile",
    on: "/socket/api/response/editSellerProfile"
}

const get_user_profile = {
    emit: "/socket/api/getUser",
    on: "/socket/api/response/getUser"
}

const add_product = {
    emit: "/socket/api/addProduct",
    on: "/socket/api/response/addProduct"
}

const edit_product = {
    emit: "/socket/api/editProduct",
    on: "/socket/api/response/editProduct"
}

const get_products = {
    emit: "/socket/api/getUserProducts",
    on: "/socket/api/response/getUserProducts"
}

const get_product = {
    emit: "/socket/api/getProduct",
    on: "/socket/api/response/getProduct"
}

const get_home_items = {
    emit: "/socket/api/getHomeItems",
    on: "/socket/api/response/getHomeItems"
}

const search = {
    emit: "/socket/api/search",
    on: "/socket/api/response/search"
}

export {
    edit_user_profile,
    get_user_profile,
    add_product,
    edit_product,
    get_products,
    get_product,
    edit_seller_profile,
    get_home_items,
    search
}