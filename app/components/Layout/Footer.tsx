"use client"

import { useInterval } from "ahooks";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Footer() {
    const [datetime, setDatetime] = useState<string>(moment().format('MMM Do YY h:mm A'));
    const [usedJSHeapSize, setUsedJSHeapSize] = useState(0);

    useInterval(() => {
        setDatetime(moment().format("MMM Do YY h:mm A"));
    }, 60000);

    useInterval(() => {
        /* eslint-disable */
        // @ts-ignore
        const mb = window.performance.memory.usedJSHeapSize / 1000000;
        setUsedJSHeapSize(mb);
    }, 30000);
;
    useEffect(() => {
        /* eslint-disable */
        // @ts-ignore
        setUsedJSHeapSize(window.performance.memory.usedJSHeapSize / 1000000);
    }, []);

    return <footer className="fixed inset-x-0 bottom-0 border-t-2 border-slate-100">
        <div className="flex justify-between items-center px-4 h-8 bg-gray-100 border-b-1 shadow-md bg-gradient-to-b from-gray-50 to-gray-300">
            <div className="flex-none w-14 font-bold text-xs">
                <div className="inline">
                    <a href="#">CwcOS</a>
                </div>
            </div>
            <div className="grow text-xs">
                <span className="text-xs border border-[#333] px-1 bg-[#E5EDD5]">
                    Usage:{usedJSHeapSize.toFixed(2)}MB
                </span>
            </div>
            <div className="flex-none w-32 text-xs text-gray-600">
                {datetime}
            </div>
        </div>
    </footer>;
}
