import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.locations.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Ośrodki ochrony zwierząt</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-24 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chronimy, pomagamy, ratujemy
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {data?.map((location) => (
              <Link href={`/creatures/${location.id}`} key={location.id}>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-lg">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {location.name}
                  </h2>
                </div>
              </Link>
            ))}

            <Link href="/creatures/add">
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-secondary-focus p-8 shadow-lg">
                <h2 className="text-2xl font-bold tracking-tight text-white">Dodaj zwierzę</h2>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
