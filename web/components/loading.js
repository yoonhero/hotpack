import { useEffect, useState } from "react";
import { CopyRight } from "./copyright";
import { Quote } from "./quote";

const Loading = () => {
    const [text, setText] = useState("핫팩이 로딩중이에요...");

    useEffect(() => {
        setTimeout(() => {
            if (text != "핫팩이 로딩중이에요...") {
                setText(text + ".");
            } else {
                setText("핫팩이 로딩중이에요");
            }
        }, 1000);
    }, [text]);

    return (
        <main className='flex flex-col items-center justify-center w-screen h-screen'>
            <div className='flex flex-col justify-center items-center space-x-1 text-sm text-gray-700'>
                <svg fill='none' className='w-20 h-20 animate-spin' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        clipRule='evenodd'
                        d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                        fill='currentColor'
                        fillRule='evenodd'
                    />
                </svg>

                <div className='text-xl font-md'>{text}</div>
            </div>

            <Quote />
            <CopyRight />
        </main>
    );
};

export { Loading };
