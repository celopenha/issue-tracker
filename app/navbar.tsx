"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const NavBar = () => {
  const pathname = usePathname();
  console.log(pathname);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b h-14 items-center px-5 ">
      <Link className="m-l-2" href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              // className={`${
              //   link.href === pathname ? `text-zinc-800 font-bold` : `text-zinc-500`
              // } hover:text-zinc-800 transition-colors`}
              className={classnames({
                "text-zinc-800 font-bold": link.href === pathname,
                "text-zinc-500": link.href !== pathname,
                "hover:text-zinc-800 transition-colors duration-200": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
