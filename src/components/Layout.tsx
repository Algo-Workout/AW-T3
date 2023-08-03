import Navbar from './Navbar'
import type { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}

export default Layout;