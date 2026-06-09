type Props = {
  message?: string;
};

export default function ErrorMessage({
  message = "Something went wrong",
}: Props) {
  return <div>{message}</div>;
}
