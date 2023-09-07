interface FieldLabelProps {
  label: string;
  isRequired?: boolean;
  info?: string;
}

export const FieldLabel = ({ label, isRequired, info }: FieldLabelProps) => {
  return (
    <div className="relative mb-1 flex flex-row items-center">
      <span
        className={`text-sm font-medium text-white ${
          isRequired && "after:ml-0.5 after:text-red-500 after:content-['*']"
        }`}
      >
        {label}
      </span>
      {info && (
        <span className="hover:group group relative ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-900 text-center text-sm font-medium text-white hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
          ?
          <span className="absolute left-full ml-1 whitespace-nowrap text-sm font-normal text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {info}
          </span>
        </span>
      )}
    </div>
  );
};
