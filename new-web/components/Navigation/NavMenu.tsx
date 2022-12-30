import React from "react";

interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {}

export const NavMenu: React.FC<NavMenuProps> = ({}) => {
  const [navColor, setNavColor] = React.useState<"white" | "primary">(
    "primary"
  );

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      if (window.scrollY === 0) {
        setNavColor("primary");
      } else if (window.scrollY > 0) {
        setNavColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 `}
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
          } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 `}
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
          } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 `}
        >
          Services
        </a>
      </li>
    </ul>
  );
};
