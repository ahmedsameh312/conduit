import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../features/auth/useCurrentUser";
import Spinner from "../ui/Spinner";

export default function Header() {
  const { logout } = useAuth();

  const { data, isLoading } = useCurrentUser();
  if (isLoading) return <Spinner />;

  const user = data?.user;
  // const isAuthenticated = Boolean(user);
  const isAuthenticated = !!user;

  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-green-500">
          Conduit
        </Link>

        <ul className="flex items-center gap-6 text-gray-500">
          <li>
            <Link to="/" className="transition-colors hover:text-green-500">
              Home
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-green-500"
                >
                  Sign in
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition-colors hover:text-green-500"
                >
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/editor"
                  className="transition-colors hover:text-green-500"
                >
                  New Article
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  className="transition-colors hover:text-green-500"
                >
                  Settings
                </Link>
              </li>

              <li className="flex items-center gap-3">
                <Link
                  to={`/profile/${user?.username}`}
                  className="transition-colors hover:text-green-500"
                >
                  {user?.username}
                </Link>

                <button
                  onClick={logout}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
