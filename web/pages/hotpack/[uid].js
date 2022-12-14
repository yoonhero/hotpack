import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BaseLayout } from "../../components/base_layout";
import { Button } from "../../components/btn";
import { handleCopyClipBoard } from "../../utils/clipboard";
import { TemperatureBox } from "../../components/temperature";

const HotPack = () => {
    const router = useRouter();

    const [isOwner, setIsOwner] = useState(false);
    const [hotpackID, setHotpackID] = useState("");
    const [hotpackName, setHotPackName] = useState("윤승현");
    const [temperature, setTemperature] = useState(65);
    const [messageCount, setMessageCount] = useState(100);

    useEffect(() => {
        setHotpackID(router.query.uid);
    }, []);

    return (
        <BaseLayout>
            <div className='w-full md:w-[37.5rem]  flex flex-row justify-around md:justify-between items-center'>
                {/* 주인 */}
                <div className=''>
                    <div>
                    <span className='text-2xl md:text-4xl text-rose-500 font-extrabold'>{hotpackName}</span>
                        <span className='text-xl md:text-3xl text-gray-600 font-semibold'>님의 핫팩</span>
                    </div>

                    <div>
                        <span className='text-md font-bold text-gray-600'>
                            <span className='text-xl font-bold text-red-400'>"{messageCount}"</span>개의 따뜻한 메세지가 도착했어요!
                        </span>
                    </div>
                </div>

                <TemperatureBox temperature={temperature} />
            </div>

            <div className='mt-[1.4375rem]'></div>

            <div className='relative w-full md:w-[40.687rem] my-2'>
                <Image alt='HOTPACK' src='/hotpack.jpeg' width={100} height={100} layout='responsive' objectFit='contain' />
            </div>

            <div className='w-full flex flex-col items-center my-5'>
                {!isOwner ? (
                    // 주인이 아니라 손님이 들어온다면
                    <>
                        <Button bgColor='bg-[#ff5d56]' onClickFunction={() => router.push(`/write/${router.query.uid}`)}>
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
