"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import "./styles.css";
import Link from "next/link";
import Category2 from "./components/Category2";
import Loading from "./components/Loading";
import moment from "moment";

interface Post {
    id: number;
    category_id: number;
    category_name: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

const mockData = [
    {
        id: 1,
        name: "Frontend",
        children: [
            { id: 2, name: "Javascript" },
            { id: 3, name: "React18" },
            { id: 4, name: "Vue3" },
            { id: 5, name: "Typescript" },
        ],
    },
    {
        id: 6,
        name: "Backend",
        children: [
            {
                id: 7,
                name: "PHP",
                children: [
                    {
                        id: 11,
                        name: "Laravel",
                    },
                    {
                        id: 12,
                        name: "ThinkPHP",
                    },
                ],
            },
            { id: 8, name: "Java" },
            {
                id: 9,
                name: "Golang",
                children: [
                    {
                        id: 10,
                        name: "Gin Framework",
                    },
                ],
            },
        ],
    },
];

export default function BlogPage() {
    const [posts] = useState<Post[]>([]);

    const [isNewTab, setIsNewTab] = useState(false);

    const onNewTab = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const isNewTab = evt.target.checked;
        setIsNewTab(isNewTab);
    };

    const onShowTop = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const isShowTop = evt.target.checked;
        console.log("Is show top?", isShowTop); // skipcq: JS-0002
    };

    const newTabProps = useMemo(() => {
        return isNewTab
            ? {
                  target: "_blank",
              }
            : null;
    }, [isNewTab]);

    // const fetchCategories = async () => {
    //     const data = await fetch(`http://127.0.0.1:9000/categories`);
    //     const jsonData = await data.json();
    //     return jsonData.data;
    // };

    // const fetchPosts = async (categoryId: number) => {
    //     const data = await fetch(`http://127.0.0.1:9000/posts?category_id=${categoryId}`);
    //     const jsonData = await data.json();
    //     return jsonData.data;
    // }

    const onCategorySelected = (categoryId: number) => {
        console.log(categoryId); // skipcq: JS-0002

        // fetchPosts(categoryId);
    };

    useEffect(() => {
        // (async () => {
        //     const categories = await fetchCategories(0);
        //     setCategories(categories);
        // })();
        //
        // if (categories.length === 0) {
        //     (async () => {
        //         const posts = await fetchPosts(0);
        //         setPosts(posts);
        //     })();
        // }
    }, []);

    return (
        <>
            {/* Categories */}
            <Suspense fallback={<Loading />}>
                <Category2 items={mockData} onSelected={onCategorySelected} />
            </Suspense>

            {/* Posts */}
            <div className="mt-6">
                <table
                    className="w-full table-fixed"
                    cellSpacing={0}
                    cellPadding={0}
                >
                    <tbody>
                        <tr className="border-b border-[#hC2D5E3] bg-[#F2F2F2] border-[#C2D5E3] text-xs">
                            <td
                                colSpan={2}
                                className="text-left pl-2 py-3 space-x-3"
                            >
                                <div className="inline-block space-x-1">
                                    <input
                                        type="checkbox"
                                        onChange={onNewTab}
                                    />
                                    <label>New Tab</label>
                                </div>
                                <div className="inline-block space-x-1">
                                    <input
                                        type="checkbox"
                                        onChange={onShowTop}
                                    />
                                    <label>Show Top</label>
                                </div>
                                <button className="hover:cursor-pointer text-[#369]">
                                    All
                                </button>
                                <button className="hover:cursor-pointer text-[#369]">
                                    Newest
                                </button>
                                <button className="hover:cursor-pointer text-[#369]">
                                    Popular
                                </button>
                            </td>
                            {/* TODO Hide by device */}
                            <td className="w-28">Author</td>
                            <td className="w-24">Info</td>
                            <td className="w-28">Last Updated</td>
                        </tr>
                    </tbody>
                </table>
                {posts.length > 0 ? (
                    <table
                        className="table-fixed w-full text-sm text-[#334]"
                        cellSpacing={0}
                        cellPadding={0}
                    >
                        <tbody className={"tableBody"}>
                            {posts.map((post) => {
                                const updatedAt = moment(
                                    post.updated_at
                                ).format("YYYY/MM/DD");
                                return (
                                    <tr
                                        key={post.id}
                                        className="table-row align-middle hover:bg-[#F2F2F2]"
                                    >
                                        <td className="w-6">
                                            <HiOutlineChatBubbleBottomCenterText className="w-full block" />
                                        </td>
                                        <td>
                                            <Link
                                                href={""}
                                                className="hover:cursor-pointer text-[#369] pl-1 pr-2"
                                            >
                                                [{post.category_name}]
                                            </Link>
                                            <Link
                                                href={"/"}
                                                className="text-[#333] hover:cursor-pointer hover:border-b border-[#333]"
                                                {...newTabProps}
                                            >
                                                {post.title}
                                            </Link>
                                        </td>
                                        <td className="w-28">
                                            <cite>
                                                <button
                                                    className="hover:cursor-pointer text-[#369]"
                                                    title="(TODO)"
                                                >
                                                    (TODO)
                                                </button>
                                            </cite>
                                        </td>
                                        <td className="w-24">1.2k / 5k</td>
                                        <td className="w-28">{updatedAt}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-2 text-sm text-gray-600">
                        No content...
                    </div>
                )}
            </div>
        </>
    );
}
