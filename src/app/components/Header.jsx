import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <h1>Titulo Peliculas</h1>
      <nav>
        <Link href="/peliculas">Listado de peliculas</Link>
      </nav>
    </header>
  );
}
