"use client";
import { usePathname } from "next/navigation";
import Header from "./header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return <Header hideLogo={isHomePage} />;
} 