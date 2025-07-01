import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-semibold">Titulo Peliculas</span>
        </Link>

        <nav>
          <Link
            href="/peliculas"
            className="text-white hover:underline text-sm"
          >
            Listado de peliculas
          </Link>
        </nav>
      </div>
    </header>
  );
}
