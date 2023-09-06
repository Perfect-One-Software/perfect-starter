import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { CreatureSchema } from "~/server/generated";
import { api } from "~/utils/api";
import { convertImageToBase64 } from "~/utils/helpers";

const ALLOWED_FILE_SIZE = 1024 * 1024;

const CreateInputSchema = CreatureSchema.pick({
  image: true,
  species: true,
  colorName: true,
  locationId: true,
}).extend({
  locationId: z.string().refine((value) => value !== "", "Uzupełnij pole"),
  species: z.string().refine((value) => value !== "", "Uzupełnij pole"),
  colorName: z.string().refine((value) => value !== "", "Uzupełnij pole"),
  image: z
    .custom<FileList>()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      if (files?.[0] && typeof files[0].size === "number") {
        const size = files[0].size;
        return size < ALLOWED_FILE_SIZE;
      }
      return false;
    }, "Rozmiar pliku powinien być mniejszy niż 1 MB")
    .optional(),
});

type CreateInputSchemaType = z.infer<typeof CreateInputSchema>;

const AddCreature = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateInputSchemaType>({
    resolver: zodResolver(CreateInputSchema),
  });

  const router = useRouter();

  const { data: locations = [], isLoading: isLoadingLocations } =
    api.locations.getAll.useQuery();

  const { mutate } = api.creatures.create.useMutation({
    onSuccess: async ({ species, locationId }) => {
      toast.success(`Pomyślnie dodano zwierzę ${species} do bazy`);
      reset();
      await router.push(`/creatures/${locationId}`);
    },
    onError: () => {
      toast.error("Wystąpił błąd przy próbie dodania zwierzęcia do bazy");
    },
  });

  const onSubmit: SubmitHandler<CreateInputSchemaType> = async (data) => {
    let image;
    if (data.image?.[0]) {
      image = await convertImageToBase64(data.image[0]);
    }

    mutate({ ...data, image });
  };

  if (isLoadingLocations) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Dodaj nowe zwierzę</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="mb-3 text-center text-2xl font-semibold text-white">
          Wprowadź dane zwierzęcia
        </h1>
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="flex w-2/3 flex-col gap-y-3 sm:w-1/2 lg:w-1/3 2xl:w-1/5"
        >
          <div>
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium text-white after:ml-0.5 after:text-red-500 after:content-['*']">
                Gatunek
              </span>
              <input
                {...register("species")}
                type="text"
                placeholder="Wprowadź gatunek"
                autoComplete="off"
                className="input border-2 border-purple-950 bg-white font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
              />
            </label>
            {errors.species && (
              <span className="text-sm text-red-500">
                {errors.species.message}
              </span>
            )}
          </div>
          <div>
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium text-white after:ml-0.5 after:text-red-500 after:content-['*']">
                Kolor
              </span>
              <input
                {...register("colorName")}
                type="text"
                className="input border-2 border-purple-950 bg-white font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
                placeholder="Wprowadź kolor"
                autoComplete="off"
              />
            </label>
            {errors.colorName && (
              <span className="text-sm text-red-500">
                {errors.colorName.message}
              </span>
            )}
          </div>
          <div>
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium text-white after:ml-0.5 after:text-red-500 after:content-['*']">
                Lokalizacja ośrodka hodowlanego
              </span>
              <select
                {...register("locationId")}
                className="select border-2 border-purple-950 bg-white text-base font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
                defaultValue=""
              >
                <option value="" disabled>
                  Wybierz ośrodek hodowlany
                </option>
                {locations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            {errors.locationId && (
              <span className="text-sm text-red-500">
                {errors.locationId.message}
              </span>
            )}
          </div>
          <div>
            <label className="flex flex-col">
              <span className="mb-1 text-sm font-medium text-white">Kolor</span>
              <input
                {...register("image")}
                type="file"
                accept="image/*"
                className="file-input border-2 border-purple-950 bg-white text-base font-semibold text-black placeholder-slate-500 focus:border-fuchsia-600"
                multiple={false}
              />
            </label>
            <span className="mt-1 block text-xs italic text-white">
              Dozwolone pliki obrazów o max. rozmiarze 1 MB
            </span>
            {errors.image && (
              <span className="text-sm text-red-500">
                {errors.image.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3 w-[100px] self-center border-none bg-fuchsia-800 hover:bg-fuchsia-600 disabled:bg-slate-400"
            disabled={isSubmitting}
          >
            Wyślij
          </button>
        </form>
      </main>
    </>
  );
};

export default AddCreature;
