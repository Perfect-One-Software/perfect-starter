import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-end absolute w-full">
      <ul>
        <li>
          <Link
            href="/"
            className="block rounded bg-transparent px-4 py-2 text-secondary-focus hover:text-fuchsia-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/creatures/add"
            className="block rounded bg-transparent px-4 py-2 text-secondary-focus hover:text-fuchsia-500"
          >
            Dodaj zwierzę
          </Link>
        </li>
      </ul>
    </nav>
  );
};
