import { useState } from "react";

const activeClass = "border-[#369] text-[#369] bg-[#E5EDF2]";
const inactiveClass = "border-[#CDCDCD] text-[#333]"

interface CategoryProps {
    items?: { id: number, name: string }[];
    subItems?: { id: number, name: string }[];
    onRootClick?: (id: number) => void;
    onSubClick?: (id: number) => void;
}

export default function Category(props: CategoryProps) {
    const [categoryId, setCategoryId] = useState<number | string>("");
    const [subCategoryId, setSubCategoryId] = useState<number | null>(null);

    const onCategoryClick = (id: number) => {
        setSubCategoryId(null);
        if (id === categoryId) {
            setCategoryId(0);
            if (props.onRootClick) props.onRootClick(0);
            return;
        }

        setCategoryId(id);
        if (props.onRootClick) props.onRootClick(id);
    }

    const onSubCategoryClick = (id: number) => {
        if (id === subCategoryId) {
            setSubCategoryId(null);
            return;
        }

        setSubCategoryId(id);
        if (props.onSubClick) props.onSubClick(id);
    }

    return <>
        <ul className="flex flex-wrap items-center by-2 my-2 text-xs">
            {
                props.items?.map(item => {
                    const isActive = categoryId === item.id ? activeClass : inactiveClass;
                    return <li key={item.id} className="float-left pr-2">
                        <a onClick={() => onCategoryClick(item.id)} className={`hover:cursor-pointer p-1 border ${isActive}`}>
                            {item.name}
                        </a>
                    </li>;
                })
            }
        </ul>
        <ul className="flex flex-wrap items-center by-2 my-3 text-xs">
            {
                props.subItems?.map(item => {
                    // const isActive = subCategoryId === item.id ? activeClass : inactiveClass;
                    const isActive = () => {
                        if (subCategoryId === item.id) {
                            return activeClass;
                        } else if (subCategoryId === null) {
                            return inactiveClass;
                        } else {
                            return inactiveClass;
                        }
                    }
                    return <li key={item.id} className="float-left pr-2">
                        <a
                            onClick={() => onSubCategoryClick(item.id)}
                            className={`hover:cursor-pointer p-1 border ${isActive()}`}
                        >
                            {item.name}
                        </a>
                    </li>;
                })
            }
        </ul>
    </>;
}
