import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { CreatureSchema } from "~/server/generated";
import { api } from "~/utils/api";

const CreateInputSchema = CreatureSchema.pick({
  image: true,
  species: true,
  colorName: true,
  locationId: true,
}).extend({
  locationId: z.string().refine((value) => value !== "", "Uzupełnij pole"),
  species: z.string().refine((value) => value !== "", "Uzupełnij pole"),
  colorName: z.string().refine((value) => value !== "", "Uzupełnij pole"),
});

type CreateInputSchemaType = z.infer<typeof CreateInputSchema>;

const AddCreature = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateInputSchemaType>({
    resolver: zodResolver(CreateInputSchema),
  });

  const router = useRouter();
  console.log("🚀 ~ file: add.tsx:13 ~ AddCreature ~ errors:", errors);

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

  const onSubmit: SubmitHandler<CreateInputSchemaType> = (data) => {
    console.log("formData: ", data);
    // FIXME: handle image file to string (base64) conversion; 'image: null' value just for development purposes
    mutate({ ...data, image: null });
  };

  console.log({
    image: watch("image"),
    species: watch("species"),
    colorName: watch("colorName"),
    locationId: watch("locationId"),
  });

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
                // FIXME: type changed to "text" to handle the image upload at the later stage
                type="text"
                // type="file"
                // accept="image/*"
                // className="file-input"
                // multiple={false}
              />
            </label>
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
