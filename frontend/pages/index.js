import Head from "next/head";
import Navbar from "../components/layouts/Navbar";
import Welcome from "../components/Welcome";
import { APPTITLE } from "../constants/text";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{APPTITLE.TITLE}</title>
      </Head>
      <Navbar />

      <Welcome />
    </div>
  );
}
