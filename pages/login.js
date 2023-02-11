import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/login.module.css";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    if (email) {
      //go to dashboard
    } else {
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
            {/* {isLoading ? "Loading..." : "Sign In"} */}
            Signin
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
