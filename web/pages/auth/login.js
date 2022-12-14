import { useForm } from "react-hook-form";
import { useState } from "react"; 
import css from "styled-jsx/css";

import {
  Checkbox,
  Box,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';



const style = css`
 *{
  margin-left : 10px;
 }

 .title{
  margin-top : 15px;
  color : purple;
 }
`;

export default function App() {
  
  {/*테스트 용도 */}
  
  var dataset = null; 
  var example_id = "minjune";
  var example_pw = "1234";
  
  
  {/*유효한 로그인 정보인지 확인 (테스트)*/}

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [mode, setMode] = useState("login");

  const onSubmit = data => {
    console.log(data);
    dataset= data;

    if(dataset.id == example_id && dataset.passward == example_pw){
      location.assign("../")
    }
    else{
      alert("유효하지 않은 회원정보입니다");
    }
  }
    return (
    
    <>
    {/*Head (Head 테그를 넣으면 발생하는 오류 수정해야 함) */}
    <title>HotPack -- 로그인</title>
     <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    
    
    {/*제목*/}
    <main className="animate__animated animate__fadeInLeft">
    <h1 className="title">로그인</h1>
    <form onSubmit={handleSubmit(onSubmit)}>  
    
    
    {/*로그인 폼*/}
    <FormControl isRequired>
      <Input placeholder="ID" id="ID_TextField" label="ID" size="lg" variant={"filled"} focusBorderColor="pink.300"{...register("id", { required: true })} autoComplete="off"/>
      
      
      <Input placeholder="PASSWORD" type={"password"} size="lg" variant={"filled"} focusBorderColor="pink.300" {...register("passward", {required: true})} autoComplete="off" />
      
      </FormControl>
      <Button colorScheme={"pink"} type="submit" size="lg">확인</Button>
      
    </form>

    {/* 추가 예정 ::  신규 회원인지 확인하는 소스 코드 */}
    <span>{mode == "login" ? "처음 오셨나요?" : "다시 오셨나요?"} </span>
    <a  href="../auth/password">회원가입하기</a>
    </main>
    
    {/* css 적용 */}
    <style jsx>{style}</style>

    </>
  );
}