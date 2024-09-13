"use client"

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { HiOutlineChatBubbleBottomCenterText, HiOutlineEye, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

export default function PostPage({ params }: { params: { slug: string } }) {
    const [markdown, setMarkdown] = useState("");

    const fetchPost = () => {

    }

    const fetchMarkdown = () => {
        fetch("http://127.0.0.1:9000/posts/markdown")
            .then(res => {
                return res.json();
            })
            .then(res => {
                const data = res.data;
                setMarkdown(data);
            })
            .catch(err => {
                console.log("err: ", err);

            }).finally(() => {

            });

    }

    useEffect(() => {
        fetchMarkdown();
    }, []);

    return <>
        <div className="flex w-full my-2">
            <div className="hidden lg:flex flex-none w-64">Left</div>
            <div className="flex-1">
                <h1 className="text-2xl text-gray-600 border-b-2 overflow-hidden border-gray-600 pb-2">
                    警惕，后门病毒在chm/vbe内嵌入GadgetToJScript生成的恶意js/vbs下载白加黑远控木马
                </h1>
                <div className="prose prose-lg md:prose-base my-8 break-words">
                    <ReactMarkdown className={"wrap"}>{markdown}</ReactMarkdown>
                </div>
            </div>
        </div>
    </>;
}
