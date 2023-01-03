import { useRouter } from "next/router";
import React from "react";

interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {}

export const NavMenu: React.FC<NavMenuProps> = ({}) => {
  const router = useRouter();
  const [navColor, setNavColor] = React.useState<"white" | "primary">(
    router.pathname === "/" ? "primary" : "white"
  );

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      if (window.scrollY === 0 && router.pathname === "/") {
        setNavColor("primary");
      } else if (window.scrollY > 0 && router.pathname === "/") {
        setNavColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router]);

  return (
    <ul
      className={`flex flex-col p-4 mt-4 ${
        navColor === "primary" ? "bg-primary" : "bg-white"
      } rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 transition-all ${
        navColor === "primary" ? "md:bg-primary" : "md:bg-white"
      }`}
    >
      <li>
        <a
          href="/"
          className={`block py-2 pr-4 pl-3 ${
            navColor === "primary" ? "text-white" : "text-accent"
          } rounded hover:bg-gray-100 md:hover:bg-transparent ${
            navColor === "primary"
              ? "md:hover:text-accent"
              : "md:hover:text-primary"
          } md:p-0 `}
          aria-current="page"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/about-us"
          className={`block py-2 pr-4 pl-3 ${
            navColor === "primary" ? "text-white" : "text-accent"
          } rounded hover:bg-gray-100 md:hover:bg-transparent ${
            navColor === "primary"
              ? "md:hover:text-accent"
              : "md:hover:text-primary"
          } md:p-0 `}
          aria-current="page"
        >
          About us
        </a>
      </li>
      <li>
        <a
          href="#"
          className={`block py-2 pr-4 pl-3 ${
            navColor === "primary" ? "text-white" : "text-accent"
          } rounded hover:bg-gray-100 md:hover:bg-transparent ${
            navColor === "primary"
              ? "md:hover:text-accent"
              : "md:hover:text-primary"
          } md:p-0 `}
        >
          Services
        </a>
      </li>
    </ul>
  );
};
