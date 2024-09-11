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

    const [preselectItems, setPreselectItems] = useState<Category[]>([]);

    useEffect(() => {
        if (props.items && props.items.length > 0) {

        }
    },);

    const onCategorySelected = (categoryId: number) => {
        console.log(categoryId);
        
        return;
    };

    return <>
        {
            // 遍历一级分类
            props.items && props.items.length > 0 ? <ul className="flex flex-wrap items-center by-2 my-2 text-xs">
                {
                    props.items.map(item => {
                        return <li key={item.id} className="float-left pr-2">
                            <a
                                onClick={() => onCategorySelected(item.id)}
                                className={`hover:cursor-pointer p-1 border ${isActive}`}
                            >
                                {item.name}
                            </a>
                        </li>
                    })
                }
            </ul> : null
        }
        {
            preselectItems.length > 0 ? preselectItems.map(item => {
                return <ul key={item.id} className="flex flex-wrap items-center by-2 my-2 text-xs">
                    {
                        item.children && item.children.length > 0 ? item.children.map(item => {
                            return <li key={item.id} className="float-left pr-2">{item.name}</li>
                        }) : null
                    }
                </ul>
            }) : null
        }
    </>
}
