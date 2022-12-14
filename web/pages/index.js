import {Html, Head, Body, Main, NextScript} from 'next/document';
import css from "styled-jsx/css";
import Image from 'next/image'; 
import {Button} from "@chakra-ui/react";
import { ClassNames } from '@emotion/react';


{/*CSS*/}
const style = css`
 *{
  margin-left : 15px;
 }
  #title {
    font-size : 7rem;
    color : #ff6666;
  }
  .start_button{
    
  }
  #info{
    font-size : 2rem;
    font-style: italic;
    margin-top : 10px
  }
  .background{
  }
`;


export default function Home() {
  return (
    <>
      
       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>HotPack</title>

        <main  className="animate__animated animate__fadeInLeft">
          <h1 id='title'>HotPack Service</h1>
          <blockquote id='info'>따뜻한 온기를 전해주세요!</blockquote>

          <div>
          <Button className='start_button' backgroundColor="red" size= "lg" onClick={( )=>window.location.assign("auth/login")}>시작하기</Button>
          </div>
        </main>
        <style jsx>{style}</style>

      </>
  );
}
