import {Html, Head, Body, Main, NextScript} from 'next/document';
import css from "styled-jsx/css";
import Image from 'next/image'; 
import {Button} from "@chakra-ui/react";
import { ClassNames } from '@emotion/react';

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


export default function join() {
  return (
    <>
       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>HotPack --Join</title>

        <main  className="animate__animated animate__fadeInLeft">
          <h1 id='title'>Join Page</h1>
          <blockquote id='info'>현재 개발중</blockquote>

        </main>
        <style jsx>{style}</style>

      </>
  );
}
