export default function FieldError({
  error,
  id,
}: {
  error?: string;
  id: string;
}) {
  if (!error) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-800">
      {error}
    </p>
  );
}
