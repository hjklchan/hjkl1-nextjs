"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { HiOutlineChatBubbleBottomCenterText, HiOutlineEye, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import "./styles.css";
import Link from "next/link";
import Category2, { Category } from "./components/Category2";
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

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    // 防止重新请求
    const [currentCategory, setCurrentCategoryId] = useState<number | null>(null);
    const [loadingPosts, setLoadingPost] = useState(false);

    const [isNewTab, setIsNewTab] = useState(true);

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

    const fetchCategories = async () => {
        const data = await fetch("http://127.0.0.1:9000/categories/tree");
        const jsonData = await data.json();
        return jsonData.data;
    };

    const fetchPosts = async (categoryId?: number) => {
        const defaultUrl = "http://127.0.0.1:9000/posts";

        let url: string;
        if (categoryId) {
            url = `http://127.0.0.1:9000/posts?category_id=${categoryId}`;
        } else {
            url = defaultUrl;
        }

        const data = await fetch(url);
        const jsonData = await data.json();
        return jsonData.data;
    }

    const onCategoryReset = () => {
        fetchPosts()
            .then(res => {
                setPosts(res);
            })
            .catch(err => {
                // TODO
                console.log(err);
            })
            .finally(() => {
                setCurrentCategoryId(null);
            });
    }

    const onCategorySelected = (categoryId: number) => {
        if (currentCategory === categoryId) {
            return;
        }

        setLoadingPost(true);
        fetchPosts(categoryId)
            .then(res => {
                setPosts(res);
            })
            .catch(err => {
                // TODO
                console.log(err);
            })
            .finally(() => {
                setCurrentCategoryId(categoryId);
            });
    };

    useEffect(() => {
        (async () => {
            const categories = await fetchCategories();
            setCategories(categories);
        })();
    }, []);

    return (
        <>
            {/* Categories */}
            <Suspense fallback={<Loading />}>
                <Category2 items={categories} onReset={onCategoryReset} onSelected={onCategorySelected} />
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
                                        defaultChecked
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
                            <td className="w-24">
                                <div className="flex space-x-1">
                                    <HiOutlineChatBubbleLeftEllipsis />
                                    <span>/</span>
                                    <HiOutlineEye />
                                </div>
                            </td>
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
                                                href={`/blog/posts/${post.id}`}
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
                                        <td className="w-28">{updatedAt ? updatedAt : "N/A"}</td>
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
