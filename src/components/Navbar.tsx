import Link from 'next/link'
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <nav className="flex items-center center">
                <div className="flex items-center">
                    <span>
                        AlgoWorkout
                    </span>
                </div>
                <div>
                <Link
                    href="./api/auth/signout"
                    target="_blank"
                >
                    <h3 className="text-2xl font-bold">Logout</h3>
                </Link>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="flex items-center center">
                <div className="flex items-center">
                    <span>
                        AlgoWorkout
                    </span>
                </div>
                <div>
                    <Link
                        className=""
                        href="https://discord.com/api/oauth2/authorize?client_id=1092281094591750175&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email"
                    >
                    <h3 className="text-2xl font-bold">Login</h3>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Navbar;