"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const activeClass = "border-[#369] text-[#369] bg-[#E5EDF2]";
const inactiveClass = "border-[#CDCDCD] text-[#333]";

export interface Category {
    id: number;
    name: string;
    children?: Category[];
}

interface Category2Props {
    items?: Category[];
    onSelected?: (categoryId: number) => void;
    onLastSelected?: (categoryId: number) => void;
    onReset?: () => void;
}

export default function Category2(props: Category2Props) {
    const [preselectItems, setPreselectItems] = useState<Map<number, Category>>(
        new Map()
    );

    const root = useMemo(
        (): Category[] => [{ id: 0, name: "root", children: props.items }],
        [props.items]
    );

    const init = useCallback(() => {
        setPreselectItems(new Map());
        if (root && root.length > 0) {
            const first = root[0];
            setPreselectItems((pre) => new Map(pre.set(1, first)));
        }
    }, [root]);

    useEffect(() => {
        // Initialise the preselectItems
        init();
    }, [init]);

    const onCategorySelected = (category: Category, level: number) => {
        if (preselectItems.has(level + 1)) {
            setPreselectItems((pre) => {
                pre.delete(level + 1);
                return pre;
            });
        }

        setPreselectItems((pre) => new Map(pre.set(level, category)));
    };

    const onResetClick = () => {
        // Initialise the preselectItems again
        init();
        if (props.onReset) props.onReset();
    };

    return (
        <>
            <button
                onClick={onResetClick}
                className="text-xs hover:border-b border-[#333]"
            >
                Reset
            </button>
            {preselectItems.size > 0
                ? Array.from(preselectItems).map((item) => {
                    const [level, category] = item;
                    const currentCategoryId = preselectItems.get(
                        level + 1
                    )?.id;
                    const children = category.children;

                    return children && children.length > 0 ? (
                        <ul
                            key={level}
                            className="flex flex-wrap items-center by-2 my-2 text-xs"
                        >
                            {children && children.length > 0
                                ? children.map((item) => {
                                    const isActive =
                                        item.id === currentCategoryId
                                            ? activeClass
                                            : inactiveClass;

                                    return (
                                        <li
                                            key={item.id}
                                            className="float-left pr-2"
                                        >
                                            <button
                                                onClick={() => {
                                                    onCategorySelected(
                                                        item,
                                                        level + 1
                                                    );

                                                    // 当前 children 为空时再触发 onSelected
                                                    if (props.onSelected && item.children?.length === 0) {
                                                        props.onSelected(item.id);
                                                    }
                                                }}
                                                className={`p-1 border ${isActive}`}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    );
                                })
                                : null}
                        </ul>
                    ) : null;
                })
                : null}
        </>
    );
}
