import { type GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { generateSSHelper } from "~/server/helpers/sshelper";
import { api } from "~/utils/api";

const SharedTableHeaders = () => (
  <>
    <th>Gatunek</th>
    <th>Liczba wpisów medycznych</th>
    <th>Kolor wiodący</th>
    <th></th>
  </>
);

const CreatureList = (props: { locationId: string }) => {
  const router = useRouter();

  const { data } = api.creatures.getByLocationId.useQuery({
    locationId: props.locationId,
  });

  return (
    <>
      <Head>
        <title>Lista zwierząt ośrodka</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-start bg-base-200 p-24`}
      >
        <div className="flex flex-col gap-28">
          <h1 className="text-5xl text-secondary-focus">
            Lista zwierząt dla Ośrodka : {router.query.location}
          </h1>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" disabled />
                    </label>
                  </th>
                  <SharedTableHeaders />
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.map((row) => (
                      <tr key={row.id}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>
                          <div className="flex items-center space-x-3">
                            {row.species}
                          </div>
                        </td>
                        <td>{0}</td>
                        <td>{row.colorName}</td>
                        <th>
                          <div className="flex items-center space-x-3">
                            <button className="btn btn-ghost btn-xs">
                              Szczegóły
                            </button>
                            <button className="btn btn-ghost btn-xs">
                              Edytuj
                            </button>
                            <button className="btn btn-ghost btn-xs">
                              Usuń
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))
                  : null}
              </tbody>
              {data?.length ? (
                <tfoot>
                  <tr>
                    <th></th>
                    <SharedTableHeaders />
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSHelper();

  const locationId = context.params?.location;

  if (typeof locationId !== "string") throw new Error("Invalid location");

  await helpers.creatures.getByLocationId.prefetch({
    locationId,
  });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      locationId,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default CreatureList;
