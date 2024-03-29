import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Counter } from "../components/Counter"

const Login: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <Counter/>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://discord.com/api/oauth2/authorize?client_id=1092281094591750175&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email"
            >
              <h3 className="text-2xl font-bold">Sign in →</h3>
              <div className="text-lg">
                Sign into this application with Discord!
              </div>
            </Link>
          </div>

          <div>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href={`http://github.com/login/oauth/authorize?client_id=55f38db5a6d6644a0232&redirect_uri=${encodeURIComponent('http://localhost:3000/api/auth/callback/github')}&response_type=code&scope=user:email`}
            >
              <h3 className="text-2xl font-bold">Sign in →</h3>
              <div className="text-lg">
                Sign into this application with Github!
              </div>
            </Link>
          </div>
      </main>
    </>
  );
};

export default Login;