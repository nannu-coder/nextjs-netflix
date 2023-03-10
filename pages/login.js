import { magic } from "@/lib/magic-client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/login.module.css";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      // log in a user by their email
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        setIsLoading(false);
        // Handle errors if required!
        console.error("SOmething Went Wrong", error);
      }
    } else {
      setIsLoading(false);
      // show error msgs
      setErrorMsg("PLease Provide a Valid Email");
    }
  };

  const handleOnChangeEmail = (e) => {
    setErrorMsg("");
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Signin</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width="128"
                height="34"
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{errorMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
