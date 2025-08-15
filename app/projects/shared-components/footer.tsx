"use client";
import Link from "next/link";
import { ArrowDownRightIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Footer({ customValue = "" }: { customValue?: string }) {
  return (
    <>
      {/* Footer */}
      <footer
        className={`w-full flex flex-col md:flex-row px-6 mt-12 mb-16 ${customValue}`}
      >
        <div className="flex flex-col items-start w-full md:w-1/2">
          <p>Yay! We’ve reached the end — say 👋 hi!</p>
          <Link
            href="mailto:xiaodishaw@gmail.com"
            aria-label="Email xiaodishaw@gmail.com"
            className="group inline-flex flex-col items-start gap-2 text-xl font-bold text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded"
          >
            <div className="flex items-center gap-3">
              {/* 图标切换 */}
              <span className="relative w-10 h-10 overflow-hidden inline-block">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  <ArrowDownRightIcon className="w-10 h-10" />
                </span>
                <span className="block absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <ArrowRightIcon className="w-10 h-10" />
                </span>
              </span>
              {/* 滚动文本容器 */}
              <span className="relative h-7 overflow-hidden inline-block">
                {/* 初始文本 */}
                <span className="block transition-transform duration-300 will-change-transform group-hover:-translate-y-full">
                  Contact:&nbsp; xiaodishaw@gmail.com
                </span>
                {/* 悬停显示的文本 */}
                <span className="block absolute left-0 top-0 translate-y-full transition-transform duration-300 will-change-transform group-hover:translate-y-0">
                  Let’s&nbsp;Chat!
                </span>
              </span>
            </div>
            {/* 分割线 */}
            <span className="block w-full h-0.5 bg-gray-900"></span>
          </Link>
        </div>
        <div className="flex flex-col text-gray-500 text-sm w-full md:w-1/2 justify-end md:items-end pr-6 py-6 md:p-0">
          <Link
            href="https://www.linkedin.com/in/di-xiao-599512113/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-golden-anchor transition mb-1"
          >
            LinkedIn
          </Link>
          &copy; {new Date().getFullYear()} Di Xiao. All rights reserved.
        </div>
      </footer>
    </>
  );
}
