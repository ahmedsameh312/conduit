import { useState } from "react";
import ArticleList from "../features/articles/ArticleList";
import { useArticles } from "../features/articles/useArticles";
import { Helmet } from "react-helmet-async";
import TagList from "../features/tags/TagList";
import ErrorMessage from "../ui/ErrorMessage";
import Spinner from "../ui/Spinner";
import { useFeedArticles } from "../features/articles/useFeedArticles";
import { useCurrentUser } from "../features/auth/useCurrentUser";
import Pagination from "../features/articles/Pagination";

export default function Home() {
  const [activeTag, setActiveTag] = useState<string>();
  const [activeFeed, setActiveFeed] = useState<"global" | "your">("global");
  const [page, setPage] = useState(1);
  const { data: globalData, isLoading, error } = useArticles(activeTag, page);
  const { data: feedData } = useFeedArticles(activeFeed === "your");
  const { data: currentUserData } = useCurrentUser();

  const articles =
    activeFeed === "your" ? feedData?.articles : globalData?.articles;

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) return <ErrorMessage message="Failed to load articles" />;

  return (
    <div>
      <Helmet>
        <title>Home - Conduit</title>
      </Helmet>
      <section className="bg-green-500 py-12 text-center text-white shadow-md">
        <h1 className="text-6xl font-bold">conduit</h1>
        <p className="mt-2 text-xl text-green-100">
          A place to share your knowledge.
        </p>
      </section>
      <div className="mx-auto mt-8 max-w-6xl px-4">
        <div className="grid grid-cols-12 gap-8">
          <main className="col-span-9">
            <div className="mb-8 border-b border-gray-300">
              <button
                className={`mr-6 pb-3 ${
                  activeFeed === "global" && !activeTag
                    ? "border-b-2 border-green-500 text-green-500"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setPage(1);
                  setActiveFeed("global");
                  setActiveTag(undefined);
                }}
              >
                Global Feed
              </button>
              {currentUserData && (
                <button
                  className={`mr-6 pb-3 ${
                    activeFeed === "your" && !activeTag
                      ? "border-b-2 border-green-500 text-green-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => {
                    setActiveTag(undefined);
                    setActiveFeed("your");
                  }}
                >
                  Your Feed
                </button>
              )}
              {activeTag && (
                <button className="border-b-2 border-green-500 pb-3 text-green-500">
                  #{activeTag}
                </button>
              )}
            </div>

            <ArticleList articles={articles ?? []} />
            {activeFeed === "global" && globalData && (
              <Pagination
                currentPage={page}
                totalArticles={globalData.articlesCount}
                onPageChange={setPage}
              />
            )}
          </main>

          <aside className="col-span-3 border-l border-gray-200 pl-8">
            <div className="rounded p-4">
              <h3 className="mb-3 font-semibold">Popular Tags</h3>
              <TagList
                onSelectTag={(tag) => {
                  if (tag === activeTag) {
                    setActiveTag(undefined);
                  } else {
                    setPage(1);
                    setActiveTag(tag);
                    setActiveFeed("global");
                  }
                }}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
