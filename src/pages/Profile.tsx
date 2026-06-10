import { useParams } from "react-router-dom";
import { useProfile } from "../features/profile/useProfile";
import Spinner from "../ui/Spinner";
import { useArticlesByAuthor } from "../features/articles/useArticlesByAuthor";
import type { Article } from "../types/article";
import { useState } from "react";
import { useFavoritedArticles } from "../features/articles/useFavoritedArticles";
import ArticleItem from "../features/articles/ArticleItem";
import { useCurrentUser } from "../features/auth/useCurrentUser";
import FollowButton from "../features/profile/FollowButton";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"articles" | "favorites">(
    "articles",
  );
  const { username } = useParams();
  const { data: profileData, isLoading } = useProfile(username || "");
  const { data: userArticles } = useArticlesByAuthor(username || "");
  const { data: favoritedArticles } = useFavoritedArticles(username || "");
  const { data: currentUserData } = useCurrentUser();

  const profile = profileData?.profile;

  const isOwnProfile = currentUserData?.user.username === profile?.username;

  const articles =
    activeTab === "articles"
      ? userArticles?.articles
      : favoritedArticles?.articles;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{profile?.username + " - Conduit"}</title>
      </Helmet>
      <div>
        <section className="bg-gray-100 py-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4">
            <img
              src={profile?.image || "https://picsum.photos/200/300"}
              alt={profile?.username}
              className="mb-4 h-24 w-24 rounded-full"
            />

            <h1 className="text-3xl font-bold">{profile?.username}</h1>

            <p className="mt-2 text-center text-gray-500">{profile?.bio}</p>

            <div className="mt-4">
              {!isOwnProfile && profile && (
                <FollowButton
                  username={profile.username}
                  following={profile.following}
                />
              )}
            </div>
          </div>
        </section>
        <div className="mx-auto mt-8 max-w-4xl px-4">
          <div className="mb-8 border-b border-gray-300">
            <button
              className={`mr-6 pb-3 ${
                activeTab === "articles"
                  ? "border-b-2 border-green-500 text-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("articles")}
            >
              My Articles
            </button>
            <button
              className={`pb-3 ${
                activeTab === "favorites"
                  ? "border-b-2 border-green-500 text-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorited Articles
            </button>
          </div>
          {articles?.map((article: Article) => (
            <ArticleItem key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
