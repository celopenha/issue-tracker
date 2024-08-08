"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex justify-between space-x-6 border-b h-14 items-center px-5 ">
      <div className="flex items-center space-x-3">
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
      </div>
      <Box>
        {status === "authenticated" && (
          // <Link href="/api/auth/signout">Log out</Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size={"2"}
                radius="full"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session.user?.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
