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

export const routerNames = {
    selectUserAction: "/selectUserAction",
    selectAuthType: "/select_auth_type",
    register: "/register",
    registerSellerSelectCategory: "/register_seller_select_category",
    registerSellerDescription: "/register_seller_description",
    registerSellerContactInfo: "/register_seller_contact_info",
    registerSellerViewInfo: '/register_seller_view_info',
    login: "/login",
    resetPassword: "/reset_password",
    forgetPassword: "/forget_password",
    index: "/",
    verification: "/verification"
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
    }
];