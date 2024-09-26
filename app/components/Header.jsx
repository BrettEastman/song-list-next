import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-primary50 border-b-4 border-solid border-tertiary80 dark:bg-secondary20 dark:border-tertiary70">
      <Link
        href="/"
        className="text-primary90 dark:text-tertiary90 font-semibold hover:text-secondary60 duration-100"
      >
        Brett Eastman Studio Archives
      </Link>
      <nav>
        <ul className="flex">
          <li className="mx-2 text-primary90 dark:text-tertiary90 hover:text-secondary60 duration-100">
            <Link href="/guitar">Guitar</Link>
          </li>
          <li className="mx-2 text-primary90 dark:text-tertiary90 hover:text-secondary60 duration-100">
            <Link href="/drums">Drums</Link>
          </li>
          <li className="mx-2 text-primary90 dark:text-tertiary90 hover:text-secondary60 duration-100">
            <Link href="/bass">Bass</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
