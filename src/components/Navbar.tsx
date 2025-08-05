function Navbar() {
  return (
    <nav className="w-full bg-green-700 border-b border-green-700 text-white font-sans">
      <div className="flex items-center justify-end h-20 pr-10">
        <a
          href="/"
          className="mx-5 px-2 py-2 text-base font-bold hover:underline"
        >
          Home
        </a>
        <a
          href="/about"
          className="mx-5 px-2 py-2 text-base font-bold hover:underline"
        >
          About
        </a>
        <a
          href="/portfolio"
          className="mx-5 px-2 py-2 text-base font-bold hover:underline"
        >
          Portfolio
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
