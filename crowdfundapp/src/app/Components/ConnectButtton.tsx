import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "phone", "email"],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  createWallet("app.phantom"),
];

function LoginButton() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: "#99c1f1",
          tooltipBg: "#000000",
          primaryButtonBg: "#1a1a1a",
          primaryButtonText: "#ffffff",
        },
      })}
      connectButton={{ label: "Login" }}
      connectModal={{
        size: "wide",
        title: "Login",
        showThirdwebBranding: false,
      }}
    />
  );
}

export default LoginButton;
