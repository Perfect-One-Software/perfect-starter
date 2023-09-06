import Head from "next/head";

const AddCreature = () => {
  return (
    <>
      <Head>
        <title>Dodaj nowe zwierzę</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mb-3 text-xl font-medium text-white">
          Wprowadź dane zwierzęia
        </h1>
        <form className="flex w-[400px] flex-col gap-y-2">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-white">Gatunek</span>
            <input type="text" className="input" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-white">Kolor</span>
            <input type="text" className="input" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-white">
              Lokalizacja ośrodka hodowlanego
            </span>
            <select className="select" defaultValue={1}>
              <option value={1}>ośrodek 1</option>
              <option value={2}>ośrodek 2</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-white">Kolor</span>
            <input
              type="file"
              accept="image/*"
              className="file-input"
              multiple={false}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-3 w-[100px] self-center"
          >
            Wyślij
          </button>
        </form>
      </main>
    </>
  );
};

export default AddCreature;
