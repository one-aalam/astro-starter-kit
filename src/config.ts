import type{ NavItems } from './types'

export const NAV_ITEMS: NavItems = {
    home: {
        path: '/',
        title: 'home'
    },
    blog: {
        path: '/blog',
        title: 'blog'
    },
    about: {
        path: '/about',
        title: 'about'
    }
}

export type SiteNavItem =  keyof typeof NAV_ITEMS

export const SITE = {

}
