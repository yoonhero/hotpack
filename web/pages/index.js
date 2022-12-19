import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BaseLayout } from "../components/base_layout";
import Icon from "../components/icon";
import { Loading } from "../components/loading";
import { SnowContainer } from "../components/snow";
import { GetUID } from "../utils/api";
import { getAuthKey } from "../utils/auth";
import { SearchEngine, SearchSEO } from "../utils/SearchSEO";
import { deleteStorageItem, getStorageItem, setStorageItem } from "../utils/storage_utils";

export default function Home() {
    const router = useRouter();

    const redirectFunction = async () => {
        const jwt_token = getAuthKey();
        const uid = getStorageItem("uid");

        if (jwt_token && uid) {
            router.push(`/hotpack/${uid}`);
        } else if (jwt_token) {
            const response = await GetUID(jwt_token);

            setStorageItem("uid", response.data.me.uid);
            router.push(`/hotpack/${response.data.me.uid}`);
        } else if (uid) {
            deleteStorageItem("uid");
            router.push(`/auth?mode=login`);
        } else {
            router.push(`/auth?mode=signup`);
        }
    };

    useEffect(() => {
        redirectFunction();
    }, [router]);

    return (
        <>
            <SnowContainer />
            <Head>
                <title>핫팩을 데워주세요?! 🔥</title>
                <Icon />
                <SearchEngine />
                <SearchSEO />
            </Head>
            <BaseLayout>
                {/* <div className='mt-20 relative w-[70vw] md:w-[20.687rem] my-2 flex flex-col gap-10 items-center justify-center'>
                    <Image alt='HOTPACK' src={"/logo.PNG"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                    <h1 className='text-3xl font-bold text-gray-800'>핫팩!?</h1>

                    <span className='text-xl font-md text-gray-600 animate-ping'>로딩중...</span>
                </div> */}
                <Loading />
            </BaseLayout>
        </>
    );
}
