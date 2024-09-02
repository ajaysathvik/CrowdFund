"use client"

import {
  ConnectButton,
  darkTheme,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { client } from "../client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/people.png";
import LoginButton from "./ConnectButtton";

const Navbar = () => {
  const account = useActiveAccount();
  return (
    <nav className="items-center flex justify-between text-white px-20 py-4 bg-zinc-900/40 my-6 mx-24 rounded-xl">
      <div className="flex flex-row gap-20 items-center">
        <Image src={logo.src} alt="logo" width={50} height={50} />
        <Link href={"/"} className="text-center">
          Campaign
        </Link>
        {account && (
          <Link href={`/dashboard/${account?.address}`}>Dashboard</Link>
        )}
      </div>
      <div>
        <LoginButton  />
      </div>
    </nav>
  );
};

export default Navbar;
