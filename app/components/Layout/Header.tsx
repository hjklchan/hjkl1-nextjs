"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const navRoutes: { href: string, title: string }[] = [
    {
        href: "/blog",
        title: "Blog",
    },
    {
        href: "/about",
        title: "About",
    }
];

export default function Header() {
    const pathname = usePathname();

    // const onlineBgColor = useMemo(() => {
    //     return online ? "bg-blue-500" : "bg-red-500";
    // }, [online]);
    //

    useEffect(() => {
    }, []);

    return (<header className={"bg-gray-100 sticky top-0 w-full border-b-1 shadow-md bg-gradient-to-b from-gray-50 to-gray-300"}>
        <div className="flex justify-between px-6 items-center">
            <div>
                <nav className="mx-auto py-1">
                    <div className="flex items-center">
                        <Link href="/" className="select-none font-semibold text-sm">
                            {/* <span className={`px-2 ${onlineBgColor} rounded-full shadow-inner text-neutral-100 hover:bg-blue-700`}> */}
                            <span className={`px-2 bg-blue-500 rounded-full shadow-inner text-neutral-100 hover:bg-blue-700`}>
                                hjkl1
                            </span>
                        </Link>
                        <div className="flex space-x-3 ml-3 text-xs items-center">
                            {
                                navRoutes.map((route) => {
                                    const highlightColor = pathname === route.href ? "text-[#369] font-semibold" : "text-gray-800";

                                    return <Link
                                        key={route.href}
                                        href={route.href}
                                        className={`${highlightColor}`}
                                    >
                                        {route.title}
                                    </Link>;
                                })
                            }
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <a className="text-xs">Others</a>
            </div>
        </div>
    </header>)
}
