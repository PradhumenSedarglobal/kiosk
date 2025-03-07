import Document, { Html, Head, Main, NextScript } from "next/document";
import { DocumentHeadTags } from "@mui/material-nextjs/v13-pagesRouter";
import createEmotionCache from "@/utils/createEmotionCache";
import { Helvetica_Neue, Helvetica_Neue_Arabic } from "@/theme/typography";
import createEmotionServer from "@emotion/server/create-instance";
import Script from "next/script";
export const GTM_ID = "GTM-KWXTV8V";
export default function MyDocument(props) {
  const { isRTL } = props;
  return (
    <Html
      lang={isRTL ? "en" : "en"}
      className={
        isRTL ? Helvetica_Neue_Arabic.className : Helvetica_Neue.className
      }
      suppressHydrationWarning
    >
      <Head>
        <DocumentHeadTags {...props} />
      

      </Head>
  
      <body>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const { locale } = ctx;
  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  const isRTL =
    locale != "default" &&
    locale?.split("-")?.[1] &&
    locale?.split("-")?.[1] === "ar"
      ? "rtl"
      : "ltr";

  return {
    ...initialProps,
    emotionStyleTags,
    isRTL: isRTL,
  };
};
