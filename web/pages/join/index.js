import Head from "next/head";
import { BaseLayout } from "../../components/base_layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";

const Join = () => {
    const router = useRouter();
    const { register, handleSubmit, getValues, setValue } = useForm();

    const onValid = async () => {
        const { card_text, writer } = getValues();

        // TODO: API SERVER
        const response = { temperature: 10 };

        router.push(`/hotpack/${hotpackID}?t=${response.temperature}`);
    };

    return (
        <>
            <Head>
                <title>반가워요~:)</title>
            </Head>
            <BaseLayout>
                <div className='mt-20 relative w-full md:w-[20.687rem] my-2'>
                    <Image alt='HOTPACK' src={"/logo.PNG"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                </div>

                <div></div>

                <div className='max-w-[600px] fixed  bottom-0 w-full flex flex-row items-center py-[0.75rem] px-[1rem]'>
                    <button
                        onClick={() => router.back()}
                        className='cursor-pointer bg-white border border-2 border-gray-400 w-[6rem] py-[1rem] px-[0] rounded-[1rem] mr-[0.75rem]'>
                        <span className='text-gray-500 text-md font-bold'>이전</span>
                    </button>

                    <button onClick={handleSubmit(onValid)} className='cursor-pointer bg-[#ff5d56] w-full h-[3.5rem] rounded-[1rem]'>
                        <span className='text-white text-md font-bold'>다음</span>
                    </button>
                </div>
            </BaseLayout>
        </>
    );
};

export default Join;
