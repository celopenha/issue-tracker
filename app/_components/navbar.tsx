"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const NavBar = () => {
  return (
    <nav className="flex justify-between space-x-6 border-b h-14 items-center px-5 ">
      <div className="flex items-center space-x-3">
        <Link className="m-l-2" href="/">
          <AiFillBug />
        </Link>
        <NavLinks />
      </div>
      <Box>
        <AuthStatus />
      </Box>
    </nav>
  );
};

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/dashboard/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={classnames({
              "!text-zinc-800 font-bold": link.href === pathname,
              "nav-link": true,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Text className="cursor-pointer" onClick={() => signOut()} size="2">
              Logout
            </Text>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }
};

export default NavBar;
