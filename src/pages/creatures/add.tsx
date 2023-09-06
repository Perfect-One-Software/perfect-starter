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
        <h1 className="mb-3 text-xl font-medium text-white">
          Wprowadź dane zwierzęcia
        </h1>
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="flex w-[400px] flex-col gap-y-2"
        >
          <fieldset>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-white after:ml-0.5 after:text-red-500 after:content-['*']">
                Gatunek
              </span>
              <input {...register("species")} type="text" className="input" />
            </label>
            {errors.species && (
              <span className="text-sm text-red-500">
                {errors.species.message}
              </span>
            )}
          </fieldset>
          <fieldset>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-white after:ml-0.5 after:text-red-500 after:content-['*']">
                Kolor
              </span>
              <input {...register("colorName")} type="text" className="input" />
            </label>
            {errors.colorName && (
              <span className="text-sm text-red-500">
                {errors.colorName.message}
              </span>
            )}
          </fieldset>
          <fieldset>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-white after:ml-0.5 after:text-red-500 after:content-['*']">
                Lokalizacja ośrodka hodowlanego
              </span>
              <select
                {...register("locationId")}
                className="select"
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
          </fieldset>
          <fieldset>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-white">Kolor</span>
              <input
                {...register("image")}
                type="file"
                accept="image/*"
                className="file-input"
                multiple={false}
              />
            </label>
            <span className="block text-xs text-white">
              Dozwolone pliki obrazów o max. rozmiarze 1 MB
            </span>
            {errors.image && (
              <span className="text-sm text-red-500">
                {errors.image.message}
              </span>
            )}
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary mt-3 w-[100px] self-center bg-fuchsia-600 hover:bg-fuchsia-800 disabled:bg-slate-400"
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
