import { useForm } from "react-hook-form";
import { useState } from "react"; 
import css from "styled-jsx/css";
import { useRouter } from "next/router";
import Image from "next/image";
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
  Stack,
  Flex
} from '@chakra-ui/react';
import { BaseLayout } from "../../components/base_layout";

/* CSS */
const style = css`

.searchBar {
  margin-left: 10px;
  padding: 7px;
  border-radius: 30px;
  border: none;
  width: 600px;
  height: 20px;
  font-size: 16px;
  text-align: flex-end;
  background-color: #3A4466;
  font-family: "Nunito";
}

 *{
  
  margin-right : 5px;
  margin-left : 5px;
  text-align: center;
  margin-top : 60px;
 }

 .title{
  font-size : 60px;
  margin-top : 15px;
  color : #ff6666;
 }


.inputForm{
  margin-top : 100px;
 }
`;

export default function App() {
  
  {/*테스트 용도 */}
  
  const router = useRouter();
  var dataset = null; 
  var example_email = "1234@1234.com";
  var example_pw = "1234";
  
  
  {/*유효한 로그인 정보인지 확인 (테스트)*/}

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [mode, setMode] = useState("login");

  const onSubmit = data => {
    console.log(data);
    dataset= data;

    if(dataset.email == example_email && dataset.passward == example_pw){
      router.push("../join")
    }
    else{
      alert("유효하지 않은 회원정보입니다");
    }
  }
    return (
    
    <BaseLayout>
    {/*Head (Head 테그를 넣으면 발생하는 오류 수정해야 함) */}
    <title>HotPack -- 로그인</title>
     <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    
    
    {/*제목*/}
    
    <main className="animate__animated animate__fadeInLeft">
    {/* <h1 className="title">로그인</h1> */}
    <h1 className="title">Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>  
    
    
    
    <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>

    <Image alt='HOTPACK' src='/logo.jpg' width={400} height={400} />
    </div>
    <hr/>
    {/*로그인 폼*/}
    <Flex align="center" justify="center">
    <FormControl className="inputForm" isRequired>
      
      <Input className="searchBar" placeholder="이메일" id="Email_TextField" type={"email"} label="ID" size="lg" variant={"filled"} 
      width={"200px"} height={"200px"} fontSize={"25px"}
      focusBorderColor="pink.300"{...register("email", { required: true })} autoComplete="off"/>
    
      <Input placeholder="비밀번호" type={"password"} size="lg" variant={"filled"} fontSize={"25px"} focusBorderColor="pink.300" {...register("passward", {required: true})} autoComplete="off" />
    
      </FormControl>
      </Flex>
      <Button backgroundColor={"#ff6666"} type="submit" size="lg" width={"200px"} height={"50px"} fontSize={"25px"} >확인</Button>
      
    </form>

    {/* 추가 예정 ::  신규 회원인지 확인하는 소스 코드 */}
    <span>{mode == "login" ? "처음 오셨나요?" : "다시 오셨나요?"} </span>
    <a  href="../auth/register">회원가입하기</a>
    </main>
    
    {/* css 적용 */}
    <style jsx>{style}</style>

    </BaseLayout>
  );
}