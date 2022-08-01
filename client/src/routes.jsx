import Admin from "./pages/Admin"
import Status from "./pages/Status"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import Help from "./pages/Help"
import Forum from "./pages/Forum"
import Category from "./pages/Category"
import Post from "./pages/Post"
import Auth from "./pages/Auth"
import {ADMIN_ROUTE, CATEGORY_ROUTE, FAVORIT_ROUTE, FEEDBACK_ROUTE, FORUM_ROUTE, HELP_ROUTE, LOGIN_ROUTE, PAYMENT_ROUTE, POST_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, STATUS_ROUTE } from "./utils/consts"
import PaymentCheck from "./components/PaymentCheck/PaymentCheck"
import Feedback from "./pages/Feedback"
import Favorit from "./pages/Favorit"

export const authRoutes = [
    
    {
        path: STATUS_ROUTE,
        Component: Status
    },
    
    {
        path: SETTINGS_ROUTE,
        Component: Settings
    },
    {
        path: PAYMENT_ROUTE,
        Component: PaymentCheck
    },
    {
        path: FAVORIT_ROUTE,
        Component: Favorit
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: HELP_ROUTE,
        Component: Help
    },
    {
        path: FORUM_ROUTE,
        Component: Forum
    },
    {
        path: FEEDBACK_ROUTE,
        Component: Feedback
    },
    {
        path: PROFILE_ROUTE + '/:id',
        Component: Profile
    },
    {
        path: CATEGORY_ROUTE + '/:id',
        Component: Category
    },
    {
        path: POST_ROUTE + '/:id',
        Component: Post
    },
]