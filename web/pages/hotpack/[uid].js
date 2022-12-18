import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BaseLayout } from "../../components/base_layout";
import { Button } from "../../components/btn";
import { handleCopyClipBoard } from "../../utils/clipboard";
import { TemperatureBox } from "../../components/temperature";
import { Thermometer } from "../../components/thermometer";
import { SnowContainer } from "../../components/snow";
import { getAuthKey } from "../../utils/auth";
import { getStorageItem, setStorageItem } from "../../utils/storage_utils";
import { GetHotpackInfo, GetUID } from "../../utils/api";

const HotPack = () => {
    const router = useRouter();

    const [isOwner, setIsOwner] = useState(false);
    const [hotpackID, setHotpackID] = useState("");
    const [hotpackName, setHotpackName] = useState("");
    const [temperature, setTemperature] = useState(undefined);
    const [messageCount, setMessageCount] = useState(0);
    const [hotpackImg, setHotpackImg] = useState("");
    const [modal, setModal] = useState(false);

    const initHotpackInfo = async () => {
        const response = GetHotpackInfo();

        const h_name = response.data.hotpackName;
        const h_temp = response.data.temperature;
        const h_count = response.data.count;

        setHotpackName(h_name);
        setTemperature(h_temp);
        setMessageCount(h_count);
    };

    useEffect(() => {
        setHotpackID(router.query.uid);

        initHotpackInfo();
    }, [router]);

    const validateTokenAndUID = async () => {
        if (hotpackID == "" || !hotpackID) {
            return;
        }

        const jwt_token = getAuthKey();
        const uid = getStorageItem("uid");

        const response = await GetUID(jwt_token);

        const uid_ = response.data.me.uid;

        setIsOwner(uid == uid_);

        setStorageItem("uid", uid_);
    };

    useEffect(() => {
        validateTokenAndUID();
    }, [hotpackID]);

    useEffect(() => {
        if (temperature == undefined) {
            return;
        }

        const hotpackImgs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 99, 100];

        for (let i = 0; i < hotpackImgs.length; i++) {
            if (temperature <= hotpackImgs[i]) {
                setHotpackImg(`/${hotpackImgs[i]}.gif`);
                break;
            }
        }
    }, [temperature]);

    useEffect(() => {
        if (router.query.t) {
            setModal(true);
        }
    }, [router]);

    return (
        <>
            <SnowContainer />
            <Head>
                <title>{`${hotpackName}님의 핫팩` || "핫팩 🔥"}</title>
            </Head>
            <BaseLayout>
                {modal && (
                    <div
                        onClick={() => setModal(false)}
                        className='fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen overflow-x-hidden overflow-y-auto md:inset-0 modal'>
                        <div className='shadow flex flex-col items-center justify-center z-20 p-20 top-[20vh] w-[300px] h-[300px] rounded-full bg-[#E3E3E3] shadow-lg shadow-red-300px/50 '>
                            <Thermometer temperature={router.query.t} />

                            <span className='absolute animate-ping text-red-400 text-5xl font-extrabold'>+{router.query.t || router.query.t}도</span>
                        </div>
                    </div>
                )}

                <div className='mt-10 w-full md:w-[37.5rem]  flex flex-row justify-around md:justify-between items-center'>
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

                    <TemperatureBox temperature={temperature || 0} />
                </div>

                <div className='mt-[1.4375rem]'></div>

                <div className='relative w-full md:w-[40.687rem] my-2'>
                    <Image alt='HOTPACK' src={hotpackImg || "/logo.PNG"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                </div>

                <div className='w-full flex flex-col items-center my-5'>
                    {!isOwner ? (
                        // 주인이 아니라 손님이 들어온다면
                        <>
                            <Button
                                bgColor='bg-[#ff5d56]'
                                onClickFunction={() => router.push(`/write/${router.query.uid}?name=${hotpackName}&temperature=${temperature}`)}>
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
        </>
    );
};

export default HotPack;
