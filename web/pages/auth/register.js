import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { BaseLayout } from "../../components/base_layout";
import Head from "next/head";

export default function Register() {
    /* React Hook 설정*/
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    /* 회원가입 버튼을 눌렀을 때 작동하는 함수 */
    const onSubmit = (data) => {
        console.log(data);
        alert("회원가입이 완료되었습니다");
        location.assign("../join");
    };

    return (
        <BaseLayout>
            <Head>
                <title>HotPack -- 회원가입</title>
            </Head>
            {/*Head (Head 테그를 넣으면 발생하는 오류 수정해야 함) */}

            {/* ReCAPCHA 관련 코드 <script src="https://www.google.com/recaptcha/api.js?render=6LfRt3sjAAAAANjrdKT-FmzyTNxtSGrd0dHOmXaF"></script> */}

            <main className='animate__animated animate__fadeInLeft'>
                {/* 제목 */}
                <h1 className='title'>
                    <bold>회원가입 </bold>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <br />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <Image alt='HOTPACK' src='/logo.jpg' width={400} height={400} />
                    </div>
                    {/*회원가입 폼*/}

                    <form isRequired>
                        <label fontSize={"35px"}>Email</label>
                        <input type='email' placeholder='이메일' fontSize={"25px"} focusBorderColor='#ff6666' {...register("email")} variant={"filled"} />
                    </form>

                    <form isRequired textAlign={"right"}>
                        <label fontSize={"35px"}>Password</label>
                        <input
                            placeholder='비밀번호'
                            fontSize={"25px"}
                            type={"password"}
                            focusBorderColor='#ff6666'
                            {...register("password")}
                            variant={"filled"}
                        />
                    </form>

                    {/* todo 개인정보 처리방침 작성하기*/}
                    <form isRequired>
                        <br />
                        <label className='agree' fontSize={"15px"}>
                            <a href='#'>개인정보 처리방침에 동의하시나요??</a>
                        </label>
                        <input type='checkbox' size='lg' placeholder='확인' />
                    </form>

                    <form>
                        <button type='submit' backgroundColor={"#ff6666"} width='170px' height='80px' className='register_button' fontSize={"20px"}>
                            회원가입
                        </button>
                        {/* <reCAPTCHA sitekey="6LfRt3sjAAAAANjrdKT-FmzyTNxtSGrd0dHOmXaF"/> ReCAPCHA 관련 코드*/}
                    </form>
                </form>
            </main>
        </BaseLayout>
    );
}
