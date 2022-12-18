import { useState, useEffect } from "react";
import { BaseLayout } from "../../components/base_layout";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Auth = () => {
    const router = useRouter();

    const [mode, setMode] = useState();
    const [error, setError] = useState(undefined);

    const { register, handleSubmit, getValues, setValue } = useForm();

    useEffect(() => {
        if (router.query.mode == "signup") {
            setMode(signup);
            return;
        }

        setMode("login");
    }, [router]);

    const onValid = () => {
        const { email, password } = router.getValues();

        if (mode === "login") {
        } elif(mode =="singup"){

        }
    };

    const changeMode = (m) => {
        setMode(m);

        setValue("email", "");
        setValue("password", "");
    };

    return (
        <>
            <Head>
                <title>안뇽~</title>
            </Head>
            <BaseLayout>
                <div className=' w-[80vw] md:w-[20.687rem]  overflow-hidden bg-gray-200 flex flex-row items-center justify-around rounded-2xl shadow-sm shadow-gray-500/40'>
                    <div
                        className={`flex items-center justify-center w-full h-full cursor-pointer font-bold text-gray-600  p-3  ${
                            mode == "login" ? "text-xl bg-red-400 text-white" : "text-md"
                        }`}
                        onClick={() => changeMode("login")}>
                        로그인
                    </div>
                    <div
                        className={`flex items-center justify-center w-full h-full cursor-pointer font-bold text-gray-600  p-3  ${
                            mode == "signup" ? "text-xl bg-red-400 text-white" : "text-md"
                        }`}
                        onClick={() => changeMode("signup")}>
                        회원가입
                    </div>
                </div>

                <div className='mt-20 relative w-[80vw] md:w-[20.687rem] my-2'>
                    <Image alt='HOTPACK' src={"/logo.PNG"} width={100} height={100} layout='responsive' objectFit='contain' priority />
                </div>

                <div className='mt-10 w-[80vw] md:w-[20.687rem]'>
                    <label className='m-2 text-2xl font-extrabold'>{mode == "login" ? "로그인" : "회원가입"}</label>
                    <input
                        className='w-full m-2 py-4 px-5 outline-none text-xl font-bold text-gray-600 text-center border border-2 rounded-2xl border-gray-200 bg-gray-100'
                        type='email'
                        placeholder='이메일을 입력해주세요.'
                        {...register("email", { required: true })}
                    />

                    <input
                        className='w-full m-2 py-4 px-5 outline-none text-xl font-bold text-gray-600 text-center border border-2 rounded-2xl border-gray-200 bg-gray-100'
                        type='password'
                        placeholder='비밀번호를 입력해주세요.'
                        {...register("password", { required: true })}
                    />

                    {error && <p className='text-red-400 text-xl font-md'>{error}</p>}
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

export default Auth;