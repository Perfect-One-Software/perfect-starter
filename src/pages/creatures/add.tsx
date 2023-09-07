import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import {
  FieldErrorMessage,
  FieldLabel,
  FileInput,
  SelectInput,
  SubmitButton,
  TextInput,
} from "~/components";
import { CreatureSchema } from "~/server/generated";
import { api } from "~/utils/api";
import { convertImageToBase64 } from "~/utils/helpers";

const MAX_FILE_SIZE = 1024 * 1024;

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
        return size < MAX_FILE_SIZE;
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
    formState: { errors },
  } = useForm<CreateInputSchemaType>({
    resolver: zodResolver(CreateInputSchema),
  });

  const router = useRouter();

  const { data: locations, isLoading: isLoadingLocations } =
    api.locations.getAll.useQuery();

  const { mutate, isLoading: isSubmitting } = api.creatures.create.useMutation({
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
              <FieldLabel label="Gatunek" isRequired />
              <TextInput
                placeholder="Wprowadź gatunek"
                {...register("species")}
              />
            </label>
            {errors.species?.message && (
              <FieldErrorMessage message={errors.species.message} />
            )}
          </div>
          <div>
            <label className="flex flex-col">
              <FieldLabel label="Kolor" isRequired />
              <TextInput
                placeholder="Wprowadź kolor"
                {...register("colorName")}
              />
            </label>
            {errors.colorName?.message && (
              <FieldErrorMessage message={errors.colorName.message} />
            )}
          </div>
          <div>
            <label className="flex flex-col">
              <FieldLabel label="Lokalizacja ośrodka hodowlanego" isRequired />
              <SelectInput {...register("locationId")} defaultValue="">
                <option value="" disabled>
                  Wybierz ośrodek hodowlany
                </option>
                {locations?.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </SelectInput>
            </label>
            {errors.locationId?.message && (
              <FieldErrorMessage message={errors.locationId.message} />
            )}
          </div>
          <div>
            <label className="flex flex-col">
              <FieldLabel
                label="Zdjęcie"
                info="Dozwolone pliki obrazów o max. rozmiarze 1 MB"
              />
              <FileInput {...register("image")} />
            </label>
            {errors.image?.message && (
              <FieldErrorMessage message={errors.image.message} />
            )}
          </div>
          <SubmitButton disabled={isSubmitting} />
        </form>
      </main>
    </>
  );
};

export default AddCreature;
