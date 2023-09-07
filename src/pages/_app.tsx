import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Layout } from "~/components";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "top-center",
        }}
      />
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
};

export default api.withTRPC(MyApp);
