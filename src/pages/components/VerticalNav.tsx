import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignOutButton } from "@clerk/nextjs";
import {
  HomeIcon,
  FileTextIcon,
  CubeIcon,
  GearIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import ProductIcon from "./ProductIcon";

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/platform" },
  { icon: FileTextIcon, label: "Documents", path: "/inventory" },
  { icon: CubeIcon, label: "Projects", path: "/basic" },
  { icon: CubeIcon, label: "Optimizations", path: "/optimizations" },
  { icon: GearIcon, label: "Settings", path: "/settings" },
  { icon: ExitIcon, label: "Notifications", path: "/notifications" },
];

const getButtonClasses = (isActive: boolean, isExitIcon?: boolean) => `
  w-10 h-10 rounded-full flex items-center justify-center
  transition-colors duration-200
  ${isActive
    ? "bg-[#3EC4A14D] text-[#3EC4A1]"
    : `bg-[#101211] text-${isExitIcon ? "red-500" : "[#4D4D4D]"
    } hover:bg-[#3EC4A14D] hover:text-[#3EC4A1]`
  }
`;

export default function VerticalNav() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <nav className="bg-transparent h-screen w-16 flex flex-col">
      <div className="flex flex-col items-center justify-center py-4 space-y-8 flex-grow">
        {/* {navItems.slice(0, 3).map((item, index) => (
          <Link key={index} href={item.path}>
            <button
              className={getButtonClasses(router.pathname === item.path)}
              aria-label={item.label}
            >
              <item.icon className="w-4 h-4" />
            </button>
          </Link>
        ))} */}
        <Link href="/platform">
          <button
            className={`
             w-10 h-10 rounded-full flex items-center justify-center
              transition-colors duration-200
              ${router.pathname === "/platform"
                ? "bg-[#3EC4A14D] text-[#3EC4A1]"
                : `bg-[#101211] text-[#4D4D4D]
                    } hover:bg-[#3EC4A14D] hover:text-[#3EC4A1]`
              }
            `}
            aria-label="Home"
          >
            <HomeIcon className="w-4 h-4" />
          </button>
        </Link>
        <Link href="/inventory">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center
              transition-colors duration-200
              ${router.pathname === "/inventory"
                ? "bg-[#3EC4A14D] text-[#3EC4A1]"
                : `bg-[#101211] text-"[#CCCCCC]"
                    } hover:bg-[#3EC4A14D] hover:text-[#3EC4A1]`
              })`}
            aria-label="Documents"
            onMouseEnter={() => setHovered("/inventory")}
            onMouseLeave={() => setHovered(null)}
          >
            {/* <FileTextIcon className="w-4 h-4" /> */}
            {router.pathname === "/inventory" || hovered === "/inventory" ? (
              <ProductIcon color="#3EC4A1" />
            ) : (
              <ProductIcon color="#4D4D4D" />
            )}
          </button>
        </Link>
        <Link href="/basic">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center
              transition-colors duration-200
              ${router.pathname === "/basic"
                ? "bg-[#3EC4A14D] text-[#3EC4A1]"
                : `bg-[#101211] text-"[#CCCCCC]"
                    } hover:bg-[#3EC4A14D] hover:text-[#3EC4A1]`
              })`}
            aria-label="Projects"
            onMouseEnter={() => setHovered("/basic")}
            onMouseLeave={() => setHovered(null)}
          >
            {/* <CubeIcon className="w-4 h-4" /> */}
            {router.pathname === "/basic" || hovered === "/basic" ? (
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1667 13.667C13.1667 12.2863 11.3012 11.167 9 11.167C6.69881 11.167 4.83333 12.2863 4.83333 13.667M16.5 11.1673C16.5 10.1421 15.4716 9.2611 14 8.87533M1.5 11.1673C1.5 10.1421 2.52841 9.2611 4 8.87533M14 5.53041C14.5115 5.07265 14.8333 4.40741 14.8333 3.66699C14.8333 2.28628 13.714 1.16699 12.3333 1.16699C11.693 1.16699 11.109 1.4077 10.6667 1.80357M4 5.53041C3.48854 5.07265 3.16667 4.40741 3.16667 3.66699C3.16667 2.28628 4.28595 1.16699 5.66667 1.16699C6.30696 1.16699 6.89104 1.4077 7.33333 1.80357M9 8.66699C7.61929 8.66699 6.5 7.5477 6.5 6.16699C6.5 4.78628 7.61929 3.66699 9 3.66699C10.3807 3.66699 11.5 4.78628 11.5 6.16699C11.5 7.5477 10.3807 8.66699 9 8.66699Z"
                  stroke="#3EC4A1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1667 13.666C13.1667 12.2853 11.3012 11.166 9 11.166C6.69881 11.166 4.83333 12.2853 4.83333 13.666M16.5 11.1663C16.5 10.1412 15.4716 9.26013 14 8.87435M1.5 11.1663C1.5 10.1412 2.52841 9.26013 4 8.87435M14 5.52944C14.5115 5.07167 14.8333 4.40643 14.8333 3.66602C14.8333 2.2853 13.714 1.16602 12.3333 1.16602C11.693 1.16602 11.109 1.40673 10.6667 1.80259M4 5.52944C3.48854 5.07167 3.16667 4.40643 3.16667 3.66602C3.16667 2.2853 4.28595 1.16602 5.66667 1.16602C6.30696 1.16602 6.89104 1.40673 7.33333 1.80259M9 8.66602C7.61929 8.66602 6.5 7.54673 6.5 6.16602C6.5 4.7853 7.61929 3.66602 9 3.66602C10.3807 3.66602 11.5 4.7853 11.5 6.16602C11.5 7.54673 10.3807 8.66602 9 8.66602Z"
                  stroke="#4D4D4D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </Link>
        <Link href="/optimizations?alert=AL001">
          <button
            className={getButtonClasses(router.pathname.startsWith("/optimizations"))}
            aria-label="Optimizations"
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke={router.pathname.startsWith("/optimizations") || hovered === "/optimizations" ? "#3EC4A1" : "#4D4D4D"}
                fill={router.pathname.startsWith("/optimizations") || hovered === "/optimizations" ? "#3EC4A1" : "#4D4D4D"}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2C9.44771 2 9 1.55228 9 1C9 0.447715 9.44771 0 10 0H15C15.5523 0 16 0.447715 16 1V6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6V3.41421L9.70711 7.70711C9.31658 8.09763 8.68342 8.09763 8.29289 7.70711L6 5.41421L1.70711 9.70711C1.31658 10.0976 0.683417 10.0976 0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289L5.29289 3.29289C5.68342 2.90237 6.31658 2.90237 6.70711 3.29289L9 5.58579L12.5858 2H10Z"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center py-4 space-y-8 mt-auto">
        {/* {navItems.slice(3, 4).map((item, index) => (
          <Link key={index + 3} href={item.path}>
            <button
              className={getButtonClasses(
                router.pathname === item.path,
                item.label === "Notifications"
              )}
              aria-label={item.label}
            >
              <item.icon className={`w-4 h-4`} />
            </button>
          </Link>
        ))} */}
        <Link href="#">
          <button
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              transition-colors duration-200
              ${router.pathname === "/setting"
                ? "bg-[#3EC4A14D] text-[#3EC4A1]"
                : `bg-[#101211] text-[#4D4D4D]
                    } hover:bg-[#3EC4A14D] hover:text-[#3EC4A1]`
              }
            `}
          >
            <GearIcon className={`w-4 h-4`} />
          </button>
        </Link>
        <SignOutButton>
          <button
            className={getButtonClasses(false, true)}
            aria-label="Notifications"
          >
            <ExitIcon className={`w-4 h-4 ${"text-red-500"}`} />
          </button>
        </SignOutButton>
      </div>
    </nav>
  );
}
