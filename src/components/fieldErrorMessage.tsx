interface FieldErrorMessageProps {
  message: string;
}

export const FieldErrorMessage = ({ message }: FieldErrorMessageProps) => {
  return <span className="text-sm text-red-500">{message}</span>;
};
