import { z } from "zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, type FormEventHandler } from "react";

import { api } from "~/utils/api";

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });
}

const schema = z.object({
  species: z.string().min(2).max(80),
  colorName: z.string().min(1).max(80),
  locationId: z.string().min(1).max(80),
  images: z.custom<FileList>().optional(),
});

const AddCreature = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const locationId = router.query.locationId as string;
    if (locationId) form.setValue("locationId", locationId);
  }, [form, router.query]);

  const { mutateAsync } = api.creatures.create.useMutation();
  const { data: listOfLocations } = api.locations.getAll.useQuery();

  const [showToast, setShowToast] = useState(false);

  const onSubmit = form.handleSubmit(async ({ images, ...data }) => {
    let image = undefined;

    try {
      if (images?.[0]) image = await fileToBase64(images[0] as unknown as File);
      await mutateAsync({ ...data, image });
      form.reset();
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push(`/creatures/${data.locationId}`).catch(console.error);
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <div className={`bg-base-200 flex min-h-screen flex-col items-center p-24 gap-28"`}>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Zwierzę dodane do listy ośrodka</span>
          </div>
        </div>
      )}

      <h1 className="text-secondary-focus text-5xl mb-28">Dodaj nowe zwierzę</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="w-full">
          <label className="label">
            <span className="label-text">Wybierz gatunek</span>
          </label>
          <input
            type="text"
            placeholder="gatunek"
            className="input input-bordered w-full max-w-xs"
            {...form.register("species")}
          />
          {form.formState.errors.species && (
            <label className="label">
              <span className="label-text-alt text-secondary-focus">
                {form.formState.errors.species?.message}
              </span>
            </label>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Wybierz umaszczenie</span>
          </label>
          <input
            type="text"
            placeholder="umaszczenie"
            className="input input-bordered w-full max-w-xs"
            {...form.register("colorName")}
          />
          {form.formState.errors.colorName && (
            <label className="label">
              <span className="label-text-alt text-secondary-focus">
                {form.formState.errors.colorName?.message}
              </span>
            </label>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Wybierz ośrodek</span>
          </label>
          <select
            defaultValue="default"
            placeholder="ośrodek"
            title="Wybierz ośrodek"
            className="select select-bordered w-full max-w-xs"
            {...form.register("locationId")}
          >
            <option disabled value="default">
              Wybierz ośrodek
            </option>
            {listOfLocations?.map((loc) => (
              <option key={loc?.id} value={loc?.id}>
                {loc?.name}
              </option>
            ))}
          </select>
          {form.formState.errors.locationId && (
            <label className="label">
              <span className="label-text-alt text-secondary-focus">
                {form.formState.errors.colorName?.message}
              </span>
            </label>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Dodaj zdjęcie</span>
          </label>
          <input
            lang="pl"
            type="file"
            multiple={false}
            placeholder="image"
            alt="Specie's image"
            title="Specie's image"
            className="file-input file-input-bordered w-full max-w-xs"
            {...form.register("images")}
          />
          {form.formState.errors.images && (
            <label className="label">
              <span className="label-text-alt text-secondary-focus">
                {form.formState.errors.images?.message}
              </span>
            </label>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={!form.formState.isValid}
            className="btn btn-block btn-secondary"
          >
            {showToast ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Dodaj zwierzę"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreature;
