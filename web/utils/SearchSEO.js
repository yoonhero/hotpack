const SearchSEO = () => {
    return (
        <>
            <meta http-equiv='content-language' content='ko' />
            <meta
                name='description'
                content='핫팩을 데워주세요! 여러분의 따뜻한 한마디 한마디가 핫팩을 뜨겁게 데웁니다! 살을 에는 겨울바람 사랑이 담긴 핫팩으로 버텨낼래요?'
            />
            <meta name='keywords' content='핫팩,연말,따뜻한말,이벤트,인공지능,따뜻해져봐요,BERT,자연어처리,세마고등학교'></meta>
            <meta property='og:title' content='핫팩을 데워주세요?! 🔥' />

            <meta name='viewport' content='initial-scale=1.0, width=device-width' />

            <meta property='og:type' content='website' />
            <meta property='og:url' content='https://hotpack.vercel.app' />
            <meta property='og:image' content='https://hotpack.vercel.app/logo.PNG' />
            <meta property='og:article:author' content='Yoonhero' />
        </>
    );
};

const SearchEngine = () => {
    return (
        <>
            <meta name='naver-site-verification' content='cc0d1b842ed85479af769bb6c0e250382f7b71e5' />
            <meta name='google-site-verification' content='1KDe4Utph9TllN9u4Gzkgc3k_Xo7kWtruaYaqrIwsKM' />
        </>
    );
};

export { SearchSEO, SearchEngine };
