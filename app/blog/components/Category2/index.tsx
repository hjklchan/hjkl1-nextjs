"use client"

import { useEffect, useState } from "react";

const activeClass = "border-[#369] text-[#369] bg-[#E5EDF2]";
const inactiveClass = "border-[#CDCDCD] text-[#333]"

export interface Category {
    id: number;
    name: string;
    children?: Category[];
}

interface Category2Props {
    items?: Category[];
    onSelect?: (categoryId: number) => void;
}

export default function Category2(props: Category2Props) {
    const isActive = activeClass;

    useEffect(() => {

    }, []);

    return <>
        <CategoryRow items={props?.items} />
        {/*<ul className="flex flex-wrap items-center by-2 my-2 text-xs">
            <li className="float-left pr-2">
                <a className={`hover:cursor-pointer p-1 border ${isActive}`}>
                    Backend
                </a>
            </li>
            <li className="float-left pr-2">
                <a className={`hover:cursor-pointer p-1 border ${isActive}`}>
                    Frontend
                </a>
            </li>
        </ul>*/}
    </>
}

function CategoryRow({ items }: { items?: Category[] }) {
    const isActive = inactiveClass;

    const computeCategories = () => {
        // TODO data structure will be present as [ 1 => { id: number, name: string }[] ]
        return [];
    }

    return <>
        {
            items && items.length > 0 ? <ul className="flex flex-wrap items-center by-2 my-2 text-xs">
                {
                    items.map(item => {
                        return <li key={item.id} className="float-left pr-2">
                            <a className={`hover:cursor-pointer p-1 border ${isActive}`}>
                                Frontend
                            </a>
                        </li>
                    })
                }
            </ul> : null
        }
    </>
}
