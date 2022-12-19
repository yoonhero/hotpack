import Script from "next/script";

const NaverAnalystics = () => {
    return (
        <>
            <Script id='naver-analytics' strategy='beforeInteractive' src='//wcs.naver.net/wcslog.js' />
            <Script strategy='afterInteractive'>
                {`
                  if (!wcs_add) var wcs_add = {};
                  wcs_add['wa'] = '1840becc42aebf0';
                  if (window.wcs) {
                      wcs_do();
                  }
                  `}
            </Script>
        </>
    );
};

export { NaverAnalystics };
