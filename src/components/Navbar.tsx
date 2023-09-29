import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import discordIcon from '../../public/discord-icon.svg';
import githubIcon from '../../public/github-icon.png';
import type { StaticImageData } from 'next/image';

// Define the type for the imported images
type DiscordIconType = StaticImageData;

const Navbar = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <nav className="flex justify-between">
                <div className="ml-3 p-2">
                    <span>
                        AlgoWorkout
                    </span>
                </div>
                <div className="flex mr-3 p-2">
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
            <nav className="flex justify-between">
                <div className="ml-3 p-2">
                    <span>
                        AlgoWorkout
                    </span>
                </div>
                <div className="flex mr-3 p-2">
                    <Link
                        className="flex w-10 h-10 mr-5 hover:opacity-50 transition-opacity"
                        href="https://discord.com/api/oauth2/authorize?client_id=1092281094591750175&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email"
                    >
                    <Image src={discordIcon as DiscordIconType} alt="Discord" />
                    </Link>
                    <Link
                        className="flex w-10 h-10 mr-5 hover:opacity-50 transition-opacity"
                        href={`http://github.com/login/oauth/authorize?client_id=55f38db5a6d6644a0232&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/callback/github')}&response_type=code&scope=user:email`}
                    >
                    <Image src={githubIcon} alt='Github' />
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Navbar;