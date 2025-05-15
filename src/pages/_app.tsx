import { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "../styles/globals.css";
import { fal } from "@fal-ai/client";
// import '@uiw/react-markdown-preview/esm/styles/markdown.css';
fal.config({
  proxyUrl: "/api/fal/proxy",
});
// fal.config({
//   credentials:process.env.FAL_KEY,
// });
import {
  ClerkProvider,
} from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} signInUrl="/signin">
      <Theme accentColor="mint" appearance="dark" style={{fontFamily: 'Play, sans-serif'}}>
        <Component {...pageProps} />
      </Theme>
    </ClerkProvider>
  );
}

export default MyApp;
