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

const userPortal = {
    emit: "/socket/api/viewPortal",
    on: "/socket/api/response/viewPortal"
}

const userPortalProducts = {
    emit: "/socket/api/getProductViaType",
    on: "/socket/api/response/getProductViaType"
}

const followUser = {
    emit: "/socket/api/followUser",
    on: "/socket/api/response/followUser"
}

const markProductAsViewed = {
    emit: "/socket/api/addProductCount",
    on: "/socket/api/response/addProductCount"
}

const getProductViaId = {
    emit: "/socket/api/viewProduct",
    on: "/socket/api/response/viewProduct"
}

const createComments = {
    emit: "/socket/api/createComment",
    on: "/socket/api/response/createComment"
}

const getComments = {
    emit: "/socket/api/getProductComments",
    on: "/socket/api/response/getProductComments"
}

const submitRating = {
    emit: "/socket/api/rateProduct",
    on: "/socket/api/response/rateProduct"
}

const addProductToWish = {
    emit: "/socket/api/addWishProduct",
    on: "/socket/api/response/addWishProduct"
}

const clearWishProducts = {
    emit: "/socket/api/clearWishProducts",
    on: "/socket/api/response/clearWishProducts"
}

const removeWishProduct = {
    emit: "/socket/api/removeWishProduct",
    on: "/socket/api/response/removeWishProduct"
}

const getAddedWishProducts = {
    emit: "/socket/api/getAddedWishProducts",
    on: "/socket/api/response/getAddedWishProducts"
}

const sendRealTimeP2PMessage = {
    emit: "/socket/api/sendRealTimeP2PMessage",
    on: "/socket/api/response/sendRealTimeP2PMessage"
}

const saveUser = {
    emit: "/socket/api/saveUser",
    on: "/socket/api/updateUserList"
}

const getProductChatMessage = {
    emit: "/socket/api/getRealTimeP2PMessage",
    on: "/socket/api/response/getRealTimeP2PMessage"
}

const getAllProductChatUsersList = {
    emit: "/socket/api/getAllChatUsers",
    on: "/socket/api/response/getAllChatUsers"
}

const getAllNotifications = {
    emit: "/socket/api/getAllNotifications",
    on: "/socket/api/response/getAllNotifications"
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
    search,
    userPortal,
    userPortalProducts,
    followUser,
    markProductAsViewed,
    getProductViaId,
    createComments,
    getComments,
    submitRating,
    clearWishProducts,
    removeWishProduct,
    getAddedWishProducts,
    addProductToWish,
    saveUser,
    sendRealTimeP2PMessage,
    getAllProductChatUsersList,
    getProductChatMessage,
    getAllNotifications
}