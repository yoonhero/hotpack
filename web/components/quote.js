import { useState, useEffect } from "react";

const Quotes = [
    "어떻게 만들었을까요?!",
    "누가 만들었을까요?!",
    "거의 다 왔어요.",
    "조금만 더..",
    "ㅋ.ㅋ",
    "100도가 넘으면 핫팩을 열어볼 수 있어요! 인스타나 카톡으로 여러분의 핫팩를 공유해주세요!",
    "핫팩을 데워주세요! 여러분의 따뜻한 한마디가 추운 이 겨울을 따뜻하게 만들 수 있어요! Just HotPack!",
    "온도에 따라서 핫팩 캐릭터가 바뀌어요! 궁금하면.. 500원!",
    "이렇게 따뜻한 말을.. 🔥",
    "사랑하는 연인, 친한 친구, 부모님 모두 핫팩를 데울 수 있어요! 중요한 건 서로를 향한 “따뜻한 마음” 아닐까요?",
    "어려움이 있으신가요? 인스타 DM으로 문의해주세요!",
    "“사랑해”는 무려 5도를 높일 수 있다고..",
    "살을 에는 겨울바람 사랑이 담긴 핫팩으로 버텨낼래요!",
    "핫팩을 데워주세요! 여러분의 따뜻한 한마디 한마디가 핫팩을 뜨겁게 데웁니다!",
];

const Quote = () => {
    const [quote, setQuote] = useState();

    const getQuote = () => {
        return Quotes[Math.floor(Math.random() * Quotes.length) - 1];
    };

    useEffect(() => {
        setQuote(getQuote());
        const quote_interval = setInterval(() => {
            const t_q = getQuote();
            setQuote(t_q);
        }, 3000);
        return () => clearInterval(quote_interval);
    }, []);

    return <div className='font-thin text-gray-600 break-all text-sm p-4'>{quote}</div>;
};

export { Quote };
