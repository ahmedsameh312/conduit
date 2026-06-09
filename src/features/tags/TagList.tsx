import Spinner from "../../ui/Spinner";
import { useTags } from "./useTags";

type TagListProps = {
  onSelectTag: (tag: string) => void;
};

export default function TagList({ onSelectTag }: TagListProps) {
  const { data, isLoading } = useTags();

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {data?.tags.map((tag) => (
        <button
          className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-500"
          key={tag}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
