import { useRouter } from "next/router";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "react-multi-carousel/lib/styles.css";

import Layout from "@/components/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import { getAuth } from "@/auth/getArcanaAuth";
import { ProvideAuth } from "@/auth/useAuth";

import { useEffect } from "react";

config.autoAddCss = false;
const authProvider = getAuth();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const {events} = useRouter();
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const id = "google-translate-script";

    const addScript = () => {
      const s = document.createElement("script");
      s.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      s.setAttribute("id", id);
      const q = document.getElementById(id);
      if (!q) {
        document.body.appendChild(s);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeScript = () => {
      const q = document.getElementById(id);
      if (q) q.remove();
      const w = document.getElementById("google_translate_element");
      if (w) w.innerHTML = "";
    };

    addScript();

    events.on("routeChangeStart", removeScript);
    events.on("routeChangeComplete", addScript);

    return () => {
      events.off("routeChangeStart", removeScript);
      events.off("routeChangeComplete", addScript);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Green Trust</title>
      </Head>
      <ProvideAuth provider={authProvider}>
        {router.pathname === "/auth/login" || router.pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ProvideAuth>
    </>
  );
}
