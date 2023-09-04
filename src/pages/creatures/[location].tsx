import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

const CreatureList = () => {
  const router = useRouter();

  const locationId = String(router.query.location);

  const { data: location } = api.locations.getById.useQuery({ locationId });
  const { data: listOfCreatures } = api.creatures.getByLocationId.useQuery({ locationId });

  if (router.isReady) {
    return (
      <>
        <Head>
          <title>Lista zwierząt ośrodka</title>
        </Head>
        <main className={`bg-base-200 flex min-h-screen flex-col items-center justify-start p-24`}>
          <div className="flex flex-col gap-28">
            <h1 className="text-secondary-focus text-5xl">
              Lista zwierząt dla Ośrodka : {location?.name}
            </h1>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" disabled />
                      </label>
                    </th>
                    <th>Gatunek</th>
                    <th>Liczba wpisów medycznych</th>
                    <th>Kolor wiodący</th>
                    <th>
                      <Link
                        href={`/creatures/add?locationId=${locationId}`}
                        className="text-secondary-focus"
                      >
                        <button className="btn btn-xs btn-block btn-secondary">
                          Dodaj zwierzę do listy
                        </button>
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listOfCreatures?.map((row) => (
                    <tr key={row.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">{row.species}</div>
                      </td>
                      <td>{0}</td>
                      <td>{row.colorName}</td>
                      <th>
                        <div className="flex items-center space-x-3">
                          <button className="btn btn-ghost btn-xs">Szczegóły</button>
                          <button className="btn btn-ghost btn-xs">Edytuj</button>
                          <button className="btn btn-ghost btn-xs">Usuń</button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                {listOfCreatures?.length > 0 ? (
                  <tfoot>
                    <tr>
                      <th></th>
                      <th>Gatunek</th>
                      <th>Liczba wpisów medycznych</th>
                      <th>Wiodący kolor</th>
                      <th></th>
                    </tr>
                  </tfoot>
                ) : null}
              </table>
            </div>
          </div>
        </main>
      </>
    );
  }
  return null;
};

export default CreatureList;
