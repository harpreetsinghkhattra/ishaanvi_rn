import {
    Register,
    SelectAuthType,
    SelectUserAction,
    Login,
    ForgetPassword,
    ResetPassword,
    SelectCategory,
    ContactInfo,
    Description,
    ViewInfo,
    Verification
} from './scenes/auth/';
import Home from './scenes/Home/Home';
import { EditUserProfile } from './scenes/EditProfile';
import { UploadImage, Details, Finish } from './scenes/UploadPost';
import { Posts, ViewPost, FullImage } from './scenes/Post/';

export const routerNames = {
    selectUserAction: "/",
    selectAuthType: "/select_auth_type",
    register: "/register",
    registerSellerSelectCategory: "/register_seller_select_category",
    registerSellerDescription: "/register_seller_description",
    registerSellerContactInfo: "/register_seller_contact_info",
    registerSellerViewInfo: '/register_seller_view_info',
    login: "/login",
    resetPassword: "/reset_password",
    forgetPassword: "/forget_password",
    index: "/home",
    verification: "/verification",
    
    edit_user_profile: "/edit/user_Profile",
    post_offer_detail: '/post_offer/detail',
    post_offer_photos: '/post_offer/photos',
    post_offer_finish: '/post_offer/finish',
    post_offer_list: '/post_offer/list',
    view_offer: '/view_offer',
    view_offer_images: '/post_offer/images'
}

export const routes = [
    {
        path: routerNames.selectUserAction,
        exact: true,
        component: SelectUserAction
    },
    {
        path: routerNames.register,
        exact: true,
        component: Register
    },
    {
        path: routerNames.login,
        exact: true,
        component: Login
    },
    {
        path: routerNames.selectAuthType,
        exact: true,
        component: SelectAuthType
    },
    {
        path: routerNames.forgetPassword,
        exact: true,
        component: ForgetPassword
    },
    {
        path: routerNames.resetPassword,
        exact: true,
        component: ResetPassword
    },
    {
        path: routerNames.index,
        exact: true,
        component: Home
    },
    {
        path: routerNames.registerSellerSelectCategory,
        exact: true,
        component: SelectCategory
    },
    {
        path: routerNames.registerSellerDescription,
        exact: true,
        component: Description
    },
    {
        path: routerNames.registerSellerContactInfo,
        exact: true,
        component: ContactInfo
    },
    {
        path: routerNames.registerSellerViewInfo,
        exact: true,
        component: ViewInfo
    },
    {
        path: routerNames.verification,
        exact: true,
        component: Verification
    },
    {
        path: routerNames.edit_user_profile,
        exact: true,
        component: EditUserProfile
    },
    {
        path: routerNames.post_offer_detail,
        exact: true,
        component: Details
    },
    {
        path: routerNames.post_offer_photos,
        exact: true,
        component: UploadImage
    },
    {
        path: routerNames.post_offer_finish,
        exact: true,
        component: Finish
    },
    {
        path: routerNames.post_offer_list,
        exact: true,
        component: Posts
    },
    {
        path: routerNames.view_offer,
        exact: true,
        component: ViewPost
    },
    {
        path: routerNames.view_offer_images,
        exact: true,
        component: FullImage
    }
];