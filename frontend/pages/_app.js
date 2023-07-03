import "../styles/globals.css";
import CurrentUserProvider from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <CurrentUserProvider>
      <Component {...pageProps} />
    </CurrentUserProvider>
  );
}

export default MyApp;
