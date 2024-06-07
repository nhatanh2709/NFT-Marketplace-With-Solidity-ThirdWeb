import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/navbar";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <Navbar/>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
