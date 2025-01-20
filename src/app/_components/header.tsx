"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Notes } from "./notes";

const Header = ({ hideLogo = false }: { hideLogo?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
          {/* Logo Container */}
          <div
            // className={`transform transition-all duration-500 ease-in-out ${
            //   isScrolled || !hideLogo
            //     ? "translate-y-0 opacity-100"
            //     : "-translate-y-full opacity-0"
            // }`}
          >
            <Link href="/" className="flex items-center">
              <img
                src="/assets/logo.png"
                alt="Turun Karjalakuoro"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Musical notes in middle column */}
          <div className="relative z-0 w-full h-20">
            <div className="absolute inset-0 pointer-events-none">
              <Notes className="w-[310px] h-full"/>
            </div>
          </div>

          {/* Navigation in the last column */}
          <nav
            className={`
            lg:block
            ${
              isMenuOpen
                ? "lg:relative absolute top-20 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm"
                : "hidden"
            }
            text-right
            bg-white lg:bg-transparent
            lg:p-0 p-5 
            font-bold text-lg
            z-10
          `}
          >
            <ul
              className="
              lg:flex lg:space-x-4
              lg:space-y-0 space-y-4
            "
            >
              <li className={`px-2 rounded-lg ${!isMenuOpen ? "xl:bg-transparent bg-white" : ""}`}>
                <Link
                  href="/"
                  className={`hover:text-red-500 ${
                    pathname === "/" ? "text-red-500" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Etusivu
                </Link>
              </li>
              <li className={`px-2 rounded-lg ${!isMenuOpen ? "xl:bg-transparent bg-white" : ""}`}>
                <Link
                  href="/esiintymiset"
                  className={`hover:text-red-500 ${
                    pathname === "/esiintymiset"
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Esiintymiset
                </Link>
              </li>
              <li className={`px-2 rounded-lg ${!isMenuOpen ? "xl:bg-transparent bg-white" : ""}`}>
                <Link
                  href="/liity"
                  className={`hover:text-red-500 ${
                    pathname === "/liity" ? "text-red-500" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Liity kuoroon
                </Link>
              </li>
              <li className={`px-2 rounded-lg ${!isMenuOpen ? "xl:bg-transparent bg-white" : ""}`}>
                <Link
                  href="/tilaa-keikka"
                  className={`hover:text-red-500 ${
                    pathname === "/tilaa-keikka" ? "text-red-500" : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tilaa keikka
                </Link>
              </li>
              <li className={`px-2 rounded-lg ${!isMenuOpen ? "xl:bg-transparent bg-white" : ""}`}>
                <Link
                  href="/yhteystiedot"
                  className={`hover:text-red-500 ${
                    pathname === "/yhteystiedot"
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Yhteystiedot
                </Link>
              </li>
              <li>
                <Link
                  href="/juhlavuosi-2025"
                  className={`hover:text-red-500 px-4 py-2 rounded-full bg-red-50 border-2 border-red-200 ${
                    pathname === "/juhlavuosi-2025"
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Juhlavuosi 2025
                </Link>
              </li>
            </ul>
          </nav>

          <div className="xs:bg-transparent bg-white rounded-lg z-10 flex items-center justify-center">
            {/* Hamburger Menu Button */}
            <button
              className="lg:hidden px-2 py-2.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
