import { useForm } from "react-hook-form";
import { useState } from "react";
import css from "styled-jsx/css";

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

import { PhoneIcon } from "@chakra-ui/icons";

import reCAPTCHA from "react-google-recaptcha";

/* css */
const style = css`
 *{
  margin-left : 10px;
 }

 .title{
  margin-top : 15px;
  color : purple;
  
}
`;

/* 회원가입 버튼을 눌렀을 때 작동하는 함수 */
const onSubmit = data => {
  console.log(data);
}

export default function App() {

/* React Hook 설정*/
const { register, handleSubmit, watch, formState: { errors } } = useForm();

  
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
  
  {/*회원가입 폼*/}
  <FormControl isRequired>
    <FormLabel>ID</FormLabel>
    
    <Input placeholder="ID" id="ID_TextField" label="ID" size="lg" focusBorderColor="pink.300"{...register("id")} autoComplete="off" variant={"filled"}/>
  </FormControl>
    
  <FormControl  isRequired>
    <FormLabel>Password</FormLabel>
    <Input placeholder ="비밀번호" type={"password"} focusBorderColor="pink.300"{...register("password")} variant={"filled"}></Input>
  </FormControl>


  <FormControl isRequired>
    <FormLabel>Email 주소</FormLabel>
    <Input type="email" placeholder="email" focusBorderColor="pink.300"{...register("email")} variant={"filled"}/>
  </FormControl>
  
  
  <FormControl>
  
  {/* todo : 핑크색 줄이 생기는 문제 해결*/}
  <br/>
    <FormLabel>성별</FormLabel>
    <Select placeholder="남자"  variant={"filled"} focusBorderColor="pink.300"{...register("gender")}>
      
      <option>여자</option>
      <option>알 수 없음</option>
    </Select>    
  
  </FormControl>

  {/* 전화번호를 입력받는 곳 (현재 개발중)*/}
  <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<PhoneIcon color='gray.300' />}
    />
    <Input type='phone' placeholder='개발중' />
  </InputGroup>

  {/* todo 개인정보 처리방침 작성하기*/}
  <FormControl  isRequired>
    <br/>
    <FormLabel ><a href="#">개인정보 처리방침에 동의하시나요??</a></FormLabel>
      <Checkbox>확인</Checkbox>
  </FormControl>

  <FormControl>
    <Button type="submit"  colorScheme={"purple"}>회원가입</Button>
    {/* <reCAPTCHA sitekey="6LfRt3sjAAAAANjrdKT-FmzyTNxtSGrd0dHOmXaF"/> ReCAPCHA 관련 코드*/}
  </FormControl>
  
  </form>
  </main>

  {/* CSS 적용 */}
  <style jsx>{style}</style>
  </>
  
  );
}