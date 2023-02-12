import Loader from "@/components/loader/Loader";
import { magic } from "@/lib/magic-client";
import "@/styles/globals.css";
import { Roboto_Slab } from "@next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const redirect = async () => {
    const isLoggedin = await magic.user.isLoggedIn();
    if (isLoggedin) {
      router.push("/");
      setIsLoading(false);
    } else {
      router.push("/login");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    redirect();
    //eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   const handleComplete = () => {
  //     setIsLoading(false);
  //   };

  //   router.events.on("routeChangeStart", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleComplete);
  //   };
  // }, [router]);

  return (
    <main className={roboto.className}>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </main>
  );
}
