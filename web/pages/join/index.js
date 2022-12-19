import Head from "next/head";
import { BaseLayout } from "../../components/base_layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";
import { SnowContainer } from "../../components/snow";
import { CreateOwnHotpack } from "../../utils/api";
import { getAuthKey } from "../../utils/auth";
import Icon from "../../components/icon";
import { SearchEngine, SearchSEO } from "../../utils/SearchSEO";

const Join = () => {
    const router = useRouter();
    const { register, handleSubmit, getValues, setValue } = useForm();

    const onValid = async () => {
        const { hotpackName } = getValues();

        const jwt_token = getAuthKey();

        const response = await CreateOwnHotpack(jwt_token, hotpackName);

        if (response.data.success) {
            router.push(`/hotpack/${response.data.uid}`);
        }
    };

    return (
        <>
            <SnowContainer />
            <Head>
                <title>반가워요~:)</title>
                <Icon />
                <SearchSEO />
                <SearchEngine />
            </Head>
            <BaseLayout>
                <div className=' w-[80vw] md:w-[20.687rem]  overflow-hidden bg-gray-200 flex flex-row items-center justify-around rounded-2xl shadow-sm shadow-gray-500/40'>
                    <div
                        className={`flex items-center justify-center w-full  font-bold text-gray-600  p-4 text-xl md:text-2xl bg-red-400 text-white
                        }`}>
                        Welcome to 핫팩!
                    </div>
                </div>
                <div className='mt-20 relative w-[80vw] md:w-[20.687rem] my-2'>
                    <Image alt='HOTPACK' src={"/logo.PNG"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                </div>

                <div className='mt-10 w-[80vw] md:w-[20.687rem]'>
                    <label className='m-2 text-2xl font-bold'>핫팩 이름</label>
                    <input
                        className='w-full py-4 px-5 outline-none text-2xl font-bold text-gray-600 text-center border border-2 rounded-md border-gray-200 bg-gray-100'
                        type='text'
                        placeholder='핫팩 이름을 정해주세요.'
                        {...register("hotpackName", { required: true })}
                    />
                </div>

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
