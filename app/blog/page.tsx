"use client"

import { useEffect, useMemo, useState } from "react";
import { HiMiniLockClosed, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import "./styles.css";
import Link from "next/link";

const activeClass = "border-[#369] text-[#369] bg-[#E5EDF2]";
const inactiveClass = "border-[#CDCDCD] text-[#333]"

const categories: { id: number, name: string }[] = [
    { id: 1, name: "Programming (31)" },
    { id: 2, name: "Game (7)" },
];

export default function BlogPage() {
    const [categoryId, setCategoryId] = useState<number | string>("");
    const [isNewTab, setIsNewTab] = useState(false);

    const onCategoryClick = (id: number | string) => {
        if (id === categoryId) return;
        console.log(id);
        setCategoryId(id);
    }

    const onNewTab = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const isNewTab = evt.target.checked;
        setIsNewTab(isNewTab);
    }

    const onShowTop = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const isShowTop = evt.target.checked;
        console.log("Is show top?", isShowTop);
    }

    const newTabProps = useMemo(() => {
        return isNewTab ? {
            target: "_blank",
        } : null;
    }, [isNewTab]);

    useEffect(() => {
    }, []);

    return <>
        <ul className="flex flex-wrap items-center by-2 my-2 text-xs">
            {
                categories.map(item => {
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
            <li className="float-left pr-2">
                <a className="hover:cursor-pointer border border-[#CDCDCD] text-[#333333] p-1">
                    PHP (14)
                </a>
            </li>
            <li className="float-left pr-2">
                <a className="hover:cursor-pointer border border-[#369] text-[#369] bg-[#E5EDF2] p-1">
                    Golang (27)
                </a>
            </li>
        </ul>
        {/* Posts */}
        <div className="mt-6">
            <table className="w-full table-fixed" cellSpacing={0} cellPadding={0}>
                <tbody>
                    <tr className="border-b border-[#hC2D5E3] bg-[#F2F2F2] border-b border-[#C2D5E3] text-xs">
                        <td colSpan={2} className="text-left pl-2 py-3 space-x-3">
                            <div className="inline-block space-x-1">
                                <input type="checkbox" onChange={onNewTab} /><label>New Tab</label>
                            </div>
                            <div className="inline-block space-x-1">
                                <input type="checkbox" onChange={onShowTop} /><label>Show Top</label>
                            </div>
                            <a className="hover:cursor-pointer text-[#369]">All</a>
                            <a className="hover:cursor-pointer text-[#369]">Newest</a>
                            <a className="hover:cursor-pointer text-[#369]">Popular</a>
                        </td>
                        {/* TODO Hide by device */}
                        <td className="w-28">Author</td>
                        <td className="w-24">Info</td>
                        <td className="w-28">Last Updated</td>
                    </tr>
                </tbody>
            </table>
            <table className="table-fixed w-full text-sm text-[#334]" cellSpacing={0} cellPadding={0}>
                <tbody className={"tableBody"}>
                    <tr className="table-row align-middle hover:bg-[#F2F2F2]">
                        <td className="w-6">
                            <HiOutlineChatBubbleBottomCenterText className="w-full block" />
                        </td>
                        <td>
                            <Link href={""} className="hover:cursor-pointer text-[#369] pl-1 pr-2">
                                [C&C++ 原创]
                            </Link>
                            <Link href={"/"} className="text-[#333] hover:cursor-pointer hover:border-b border-[#333]" {...newTabProps}>
                                另一种基于AVX2/SSE2的高效模式匹配算法在内存搜索中的应用-By.Haogl-2024090
                            </Link>
                        </td>
                        <td className="w-28">
                            <cite>
                                <a
                                    className="hover:cursor-pointer text-[#369]"
                                    title="AxiaoWyaoAAAAAAAAAAAAAAAAAAAA"
                                >
                                    haogl
                                </a>
                            </cite>
                        </td>
                        <td className="w-24">1.2k / 5k</td>
                        <td className="w-28">2024/09/10</td>
                    </tr>
                    <tr className="table-row align-middle hover:bg-[#F2F2F2]">
                        <td className="w-6">
                            <HiMiniLockClosed className="w-full block" />
                        </td>
                        <td>
                            <Link href={""} className="hover:cursor-pointer text-[#369] pl-1 pr-2">
                                [其他原创]
                            </Link>
                            <span className="text-[#333] hover:cursor-pointer hover:border-b border-[#333]">
                                【开源】IP配置工具_2.6__一键切换IP、改Mac、计算机名
                            </span>
                        </td>
                        <td className="w-28">
                            <cite>
                                <a
                                    className="hover:cursor-pointer text-[#369]"
                                    title="快乐的小萌新"
                                >
                                    快乐的小萌新
                                </a>
                            </cite>
                        </td>
                        <td className="w-24">78 / 120</td>
                        <td className="w-28">2024/09/10</td>
                    </tr>
                    <tr className="table-row align-middle hover:bg-[#F2F2F2]">
                        <td className="w-6">
                            <HiMiniLockClosed className="w-full block" />
                        </td>
                        <td>
                            <Link href={""} className="hover:cursor-pointer text-[#369] pl-1 pr-2">
                                [其他原创]
                            </Link>
                            <span className="text-[#333] hover:cursor-pointer hover:border-b border-[#333]">
                                【开源】IP配置工具_2.6__一键切换IP、改Mac、计算机名
                            </span>
                        </td>
                        <td className="w-28">
                            <cite>
                                <a
                                    className="hover:cursor-pointer text-[#369]"
                                    title="快乐的小萌新"
                                >
                                    快乐的小萌新
                                </a>
                            </cite>
                        </td>
                        <td className="w-24">78 / 120</td>
                        <td className="w-28">2024/09/10</td>
                    </tr>
                    <tr className="table-row align-middle hover:bg-[#F2F2F2]">
                        <td className="w-6">
                            <HiMiniLockClosed className="w-full block" />
                        </td>
                        <td>
                            <Link href={""} className="hover:cursor-pointer text-[#369] pl-1 pr-2">
                                [其他原创]
                            </Link>
                            <span className="text-[#333] hover:cursor-pointer hover:border-b border-[#333]">
                                【开源】IP配置工具_2.6__一键切换IP、改Mac、计算机名
                            </span>
                        </td>
                        <td className="w-28">
                            <cite>
                                <a
                                    className="hover:cursor-pointer text-[#369]"
                                    title="快乐的小萌新"
                                >
                                    快乐的小萌新
                                </a>
                            </cite>
                        </td>
                        <td className="w-24">78 / 120</td>
                        <td className="w-28">2024/09/10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>;
}
