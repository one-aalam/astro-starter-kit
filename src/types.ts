export type NavItems = {
    [key: string]: NavItem
}

export type NavItem = {
    path: string,
    title: string
}

export type BaseHeadAttrs = {
    title: string,
    description?: string,
    permalink?: string,
    image?: string
}
