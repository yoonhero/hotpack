import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { BaseLayout } from "../../components/base_layout";
import { Paper, PaperContent, LetterText } from "../../components/letter";
import { TemperatureBox } from "../../components/temperature";

const WriteMessage = () => {
    const router = useRouter();

    const [hotpackID, setHotpackID] = useState("");
    const [hotpackName, setHotpackName] = useState("");
    const [temperature, setTemperature] = useState(65);

    const { register, handleSubmit, getValues, setValue } = useForm();
    const componentRef = useRef();

    useEffect(() => {
        setHotpackID(router.query.uid);
    }, [router]);

    useEffect(() => {
        if (hotpackID == "" || hotpackID == undefined) {
            return;
        }

        // GET HOTPACKNAME
        setHotpackName("승현이");
    }, [hotpackID]);

    const onValid = async () => {
        const { card_text } = getValues();

        console.log(card_text);
    };

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
                        <span className='text-xl md:text-3xl text-gray-600 font-semibold'>핫팩 온도를 높여주세요!</span>
                    </div>
                </div>

                <TemperatureBox temperature={temperature} />
            </div>

            <div className='w-full mt-[2.4375rem]'>
                <Paper onSubmit={handleSubmit(onValid)} ref={componentRef}>
                    <div className='pt-4 pl-20 pb-0'>
                        <h1 className='mb-2  text-2xl font-bold text-gray-700 l-2'>누구로부터:</h1>

                        <input placeholder='작성자' className='bg-transparent font-bold w-full py-0 px-0 text-xl text-gray-800 outline-none' />
                    </div>
                    <div className="mt-1 w-full h-[2px] bg-[#91d1d3]"></div>
                    <PaperContent>
                        <LetterText placeholder='따뜻한 말을 적어주세요!' {...register("card_text", { required: true })} />
                    </PaperContent>
                </Paper>
            </div>

            <div className='max-w-[600px] fixed  bottom-0 w-full flex flex-row items-center py-[0.75rem] px-[1rem]'>
                <button
                    onClick={() => router.back()}
                    className='cursor-pointer bg-white border border-2 border-gray-400 w-[6rem] py-[1rem] px-[0] rounded-[1rem] mr-[0.75rem]'>
                    <span className='text-gray-500 text-md font-bold'>이전</span>
                </button>

                <button className='cursor-pointer bg-[#ff5d56] w-full h-[3.5rem] rounded-[1rem]'>
                    <span className='text-white text-md font-bold'>"{hotpackName}"에게 메세지 남기기</span>
                </button>
            </div>
        </BaseLayout>
    );
};

export default WriteMessage;
