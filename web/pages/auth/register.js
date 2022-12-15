import { useForm } from "react-hook-form";
import { useState } from "react";
import css from "styled-jsx/css";
import { useRouter } from "next/router";
import {
  Checkbox,
  Box,
  Button,
  Input,
  InputGroup,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputLeftElement
} from '@chakra-ui/react';
import Image from "next/image";
import { PhoneIcon } from "@chakra-ui/icons";

import reCAPTCHA from "react-google-recaptcha";

/* css */
const style = css`
 *{
  margin-right : 5px;
  margin-left : 5px;
  text-align: center;
 }

 .title{
  margin-top : 15px;
  color : #ff6666;
 
.register_button{
  
  text-allign : left;  
}

`;

/* 회원가입 버튼을 눌렀을 때 작동하는 함수 */
const onSubmit = data => {
  console.log(data);
  alert("회원가입이 완료되었습니다");
  location.assign("../join")
}

export default function App() {

/* React Hook 설정*/
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const router = useRouter();
  
return(
  <>
  
  {/*Head (Head 테그를 넣으면 발생하는 오류 수정해야 함) */}
  <title>HotPack -- 회원가입</title>
  
  {/* ReCAPCHA 관련 코드 <script src="https://www.google.com/recaptcha/api.js?render=6LfRt3sjAAAAANjrdKT-FmzyTNxtSGrd0dHOmXaF"></script> */}
  
  
  <main  className="animate__animated animate__fadeInLeft">
  {/* 제목 */}
  <h1 className="title"><bold>회원가입 </bold></h1>
  <form onSubmit={handleSubmit(onSubmit)}>
  <br/>

  
  <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
  <Image alt='HOTPACK' src='/logo.jpg' width={400} height={400} />
  </div>
  {/*회원가입 폼*/}

  <FormControl isRequired>
    <FormLabel fontSize={"35px"}>Email</FormLabel>
    <Input type="email" placeholder="이메일"  fontSize={"25px"} focusBorderColor="#ff6666"{...register("email")} variant={"filled"}/>
  </FormControl>
      
  <FormControl  isRequired textAlign={"right"}>
    <FormLabel fontSize={"35px"}>Password</FormLabel>
    <Input placeholder ="비밀번호" fontSize={"25px"} type={"password"} focusBorderColor="#ff6666" {...register("password")} variant={"filled"}></Input>
  </FormControl>


  {/* todo 개인정보 처리방침 작성하기*/}
  <FormControl  isRequired>
    <br/>
    <FormLabel className="agree" fontSize={"15px"}><a href="#">개인정보 처리방침에 동의하시나요??</a></FormLabel>
      <Checkbox size="lg">확인</Checkbox>

  </FormControl>

  <FormControl>
    <Button type="submit" backgroundColor={"#ff6666"} width="170px" height={"80px"} className="register_button" fontSize={"20px"}>회원가입</Button>
    {/* <reCAPTCHA sitekey="6LfRt3sjAAAAANjrdKT-FmzyTNxtSGrd0dHOmXaF"/> ReCAPCHA 관련 코드*/}
  </FormControl>
  
  </form>
  </main>

  {/* CSS 적용 */}
  <style jsx>{style}</style>
  </>
  
  );
}