import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthKey } from "../../../utils/auth";
import { BaseLayout } from "../../../components/base_layout";
import Head from "next/head";
import { GetFirstMessages } from "../../../utils/api";
import Image from "next/image";
import { SnowContainer } from "../../../components/snow";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import axios from "axios";
import { LetterText, Paper, PaperContent } from "../../../components/letter";

const SeeAllMessages = () => {
    const router = useRouter();

    const [hotpackID, setHotpackID] = useState("");
    const [lock, setLock] = useState(true);
    const [messages, setMessages] = useState([]);

    const [targetMsg, setTargetMsg] = useState("");
    const [targetWriter, setTargetWriter] = useState("");
    const [targetTemp, setTargetTemp] = useState(0);
    const [modal, setModal] = useState("");

    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(0);
    const [HasMore, setHasMore] = useState(true);

    const [lastElementRef] = useInfiniteScroll(HasMore ? loadMoreItems : () => {}, isFetching);

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

        const response = await GetFirstMessages(jwt_token);

        try {
            if (!response.data.success) {
                setLock(true);
                return;
            }

            setLock(false);

            setMessages(response.data.messages);
            setPage((prevPage) => prevPage + 1);
        } catch (e) {
            return;
        }
    };

    useEffect(() => {
        seeMessage();
    }, [hotpackID]);

    function loadMoreItems() {
        setIsFetching(true);

        const jwt_token = getAuthKey();
        //using axios to access the third party API
        axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_LINK}/hotpack/all`,
            params: { page: page + 1, limit: 12 },
            headers: { Authorization: "Bearer " + jwt_token },
        })
            .then((res) => {
                console.log(res);
                setMessages((prevItems) => {
                    return [...new Set([...prevItems, ...res.data.messages])];
                });
                setPage((prevPageNumber) => prevPageNumber + 1);
                setHasMore(res.data.length > 0);
                setIsFetching(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
            <SnowContainer />
            <Head>
                <title>따뜻한 말 확인하기!</title>
            </Head>
            <BaseLayout>
                {modal && (
                    <div
                        onClick={() => setModal(false)}
                        className='fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen overflow-x-hidden overflow-y-auto md:inset-0 modal'>
                        <div className='shadow flex flex-col items-center justify-center z-20 p-20 top-[20vh] w-[300px] h-[300px] rounded-full bg-[#E3E3E3] shadow-lg shadow-red-300px/50 '>
                            <div className='w-[95vw] mt-[2.4375rem]'>
                                <Paper>
                                    <div className=' h-[85px] flex flex-row items-end justify-between px-[40px] md:px-[90px] '>
                                        <div className='flex flex-row items-center justify-center gap-2'>
                                            <h1 className='text-center items-center  font-sans text-2xl font-bold text-gray-700 l-2'>보내는 사람:</h1>

                                            <span className='bg-transparent font-bold   py-0 px-0 text-xl text-gray-600 outline-none'>{targetWriter}</span>
                                        </div>

                                        <span>{"🔥".repeat(targetTemp)}</span>
                                    </div>
                                    <div className='mt-1 w-full h-[2px] bg-[#91d1d3]'></div>
                                    <PaperContent>
                                        <LetterText value={targetMsg} />
                                    </PaperContent>
                                </Paper>
                            </div>
                        </div>
                    </div>
                )}

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
                                // if (i < (pagination + 1) * 12 && i >= pagination * 12) {
                                //     return (

                                //     );
                                // }
                                return (
                                    <div
                                        ref={lastElementRef}
                                        onClick={() => {
                                            setTargetMsg(m.message);
                                            setTargetWriter(m.writer);
                                            setTargetTemp(m.temperature);
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
                            })}
                        </div>

                        {/* <div className='flex flex-row m-4'>
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
                        </div> */}
                    </>
                )}
            </BaseLayout>
        </>
    );
};

export default SeeAllMessages;
