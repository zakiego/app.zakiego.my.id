import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Zakiego</title>
      </Head>
      <div className="flex min-h-screen bg-black">
        <h1 className="m-auto text-2xl text-white">
          <div className="text-6xl">Hi</div>
          <a
            className="underline transition-all underline-offset-2 hover:opacity-75"
            href="https://github.com/zakiego/app.zakiego.my.id"
          >
            Github
          </a>
        </h1>
      </div>
    </>
  );
}
