import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-100 py-4 shadow-inner">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4">
        <span className="text-xl font-bold text-green-500">conduit</span>

        <span className="text-xs text-gray-500">
          An interactive learning project from{" "}
          <Link
            to="https://github.com/realworld-apps/realworld"
            target="_blank"
            rel="noreferrer"
            className="font-semibold hover:text-green-500"
          >
            RealWorld
          </Link>
          . Code licensed under MIT
        </span>
      </div>
    </footer>
  );
}
