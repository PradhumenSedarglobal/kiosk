import Head from "next/head";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="stylesheet" href="../app/custom.css" /> 
        {/* Add the Google Fonts Import URL */}
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');`}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </style>
      </Head>
      <body >
        <AppRouterCacheProvider>
           
              {children}
             
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
