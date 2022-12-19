import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthKey } from "../../../utils/auth";
import { BaseLayout } from "../../../components/base_layout";
import Head from "next/head";
import { GetAllMessages } from "../../../utils/api";
import Image from "next/image";
import { SnowContainer } from "../../../components/snow";

const SeeAllMessages = () => {
    const router = useRouter();

    const [hotpackID, setHotpackID] = useState("");
    const [lock, setLock] = useState(true);
    const [messages, setMessages] = useState([]);

    const [pagination, setPagination] = useState(0);
    const [targetMsg, setTargetMsg] = useState("");
    const [modal, setModal] = useState("");

    useEffect(() => {
        if (router.query.uid) {
            setHotpackID(router.query.uid);
        }
    }, [router]);

    const seeMessage = async () => {
        if (hotpackID == "") {
            return;
        }

        const jwt_token = getAuthKey();

        const response = await GetAllMessages(jwt_token);

        try {
            if (!response.data.success) {
                setLock(true);
                return;
            }

            setLock(false);

            setMessages(response.data.messages);
        } catch (e) {
            return;
        }
    };

    useEffect(() => {
        seeMessage();
    }, [hotpackID]);

    return (
        <>
            <SnowContainer />
            <Head>
                <title>따뜻한 말 확인하기!</title>
            </Head>
            <BaseLayout>
                {lock ? (
                    <div className='bg-gray-100 text-2xl font-bold flex flex-col gap-10 w-full h-screen items-center justify-center'>
                        <div className='relative w-[70vw] md:w-[20.687rem] my-2'>
                            <Image alt='HOTPACK' src={"/lock.png"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                        </div>
                        <span>100도가 넘으면 볼 수 있어요!</span>
                    </div>
                ) : (
                    <>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <h1 className='mt-10 text-4xl md:text-5xl font-extrabold text-gray-800'>- 따뜻한 메세지!! 🔥 -</h1>
                            <span className='font-thin text-gray-600 break-all text-md my-4'>100도를 달성하셨어요!</span>
                        </div>
                        <div className='relative w-[80vw] md:w-[40.687rem] my-2'>
                            <Image alt='HOTPACK' src={"/logo.PNG"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                        </div>

                        <div className='my-5 grid grid-cols-3 md:grid-cols-4 grid-flow-row gap-4'>
                            {messages.map((m, i) => {
                                if (i < (pagination + 1) * 12 && i >= pagination * 12) {
                                    return (
                                        <div
                                            onClick={() => {
                                                setTargetMsg(m.message);
                                                setModal(true);
                                            }}
                                            key={i}
                                            className='relative flex items-center justify-center w-[80px] h-[100px] md:w-[120px] md:h-[150px] rounded-md bg-white shadow-lg shadow-gray-100/200 border border-2  border-gray-500 hover:bg-gray-200 hover:text-gray-900'>
                                            <div
                                                className={`absolute ${
                                                    m.temperature == 5
                                                        ? "text-center w-[120px] text-md top-[-15px] md:max-w-[140px] md:text-2xl md:top-[-18px]"
                                                        : m.temperature == 4
                                                        ? "text-center max-w-[80px] text-md top-[-15px] md:max-w-[120px] md:text-2xl md:top-[-17px]"
                                                        : "text-2xl top-[-12px] md:text-4xl md:top-[-20px]"
                                                }`}>
                                                {"🔥".repeat(m.temperature)}
                                            </div>
                                            <span className='cursor-pointer text-gray-600 font-semibold text-2xl'>{m.writer}</span>
                                        </div>
                                    );
                                }
                            })}
                        </div>

                        <div className='flex flex-row m-4'>
                            {pagination - 1 >= 0 && (
                                <button
                                    onClick={() => setPagination(pagination - 1)}
                                    className='inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 '>
                                    <svg aria-hidden='true' className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            fillRule='evenodd'
                                            d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
                                            clip-rule='evenodd'></path>
                                    </svg>
                                    이전
                                </button>
                            )}
                            {pagination + 1 < Math.ceil(messages.length / 12) && (
                                <button
                                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 '
                                    onClick={() => setPagination(pagination + 1)}>
                                    다음
                                    <svg aria-hidden='true' className='w-5 h-5 ml-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            fillRule='evenodd'
                                            d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                                            clip-rule='evenodd'></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </>
                )}
            </BaseLayout>
        </>
    );
};

export default SeeAllMessages;
