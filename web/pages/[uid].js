import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BaseLayout } from "../components/base_layout";
import { Button } from "../components/btn";
import { handleCopyClipBoard } from "../utils/clipboard";

const HotPack = () => {
    const router = useRouter();

    const [isOwner, setIsOwner] = useState(true);
    const [hotpackName, setHotPackName] = useState("윤승현");
    const [temperature, setTemperature] = useState(65);
    const [messageCount, setMessageCount] = useState(100);

    // router.query.id;

    return (
        <BaseLayout>
            <div className='w-[37.5rem]  flex flex-row justify-between items-center'>
                {/* 주인 */}
                <div className=''>
                    <div>
                        <span className='text-4xl text-rose-500 font-extrabold'>{hotpackName}</span>
                        <span className='text-3xl text-gray-600 font-semibold'>님의 핫팩</span>
                    </div>

                    <div>
                        <span className='text-md font-bold text-gray-600'>
                            <span className='text-xl font-bold text-red-400'>"{messageCount}"</span>개의 따뜻한 메세지가 도착했어요!
                        </span>
                    </div>
                </div>

                {/* 온도 */}
                <div className='px-3 py-1 border border-[3px] border-red-500 rounded-2xl'>
                    <span className='text-2xl font-bold text-red-500 '>{temperature}°</span>
                </div>
            </div>

            <div className='mt-[1.4375rem]'></div>

            <div className='relative w-[40.687rem] my-2'>
                <Image alt='HOTPACK' src='/hotpack.jpeg' width={300} height={300} layout='responsive' objectFit='contain' />
            </div>

            <div className='w-full flex flex-col items-center my-5'>
                {!isOwner ? (
                    // 주인이 아니라 손님이 들어온다면
                    <>
                        <Button bgColor='bg-[#ff5d56]' onClickFunction={() => router.push("/write")}>
                            <div className='flex flex-row items-center justify-center gap-2'>
                                <Image width={25} height={25} src='/warm.svg' />
                                <span className='font-semibold'>핫팩에 메세지 남겨주기</span>
                            </div>
                        </Button>

                        <Button bgColor='' txtColor='text-gray-800' onClickFunction={() => router.push("/auth")}>
                            <span className='font-semibold'>나도 핫팩 만들기</span>
                        </Button>
                    </>
                ) : (
                    // 주인이 들어왔을 때
                    <Button bgColor='bg-gray-500' onClickFunction={() => handleCopyClipBoard(window.location.href)}>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <Image width={25} height={25} src='/clipboard.svg' />
                            <span className='font-semibold'>내 핫팩 링크 복사하기</span>
                        </div>
                    </Button>
                )}
            </div>
        </BaseLayout>
    );
};

export default HotPack;
