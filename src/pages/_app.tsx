// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import useDarkMode from "@/hooks/useDarkMode";

function AppWrapper({ Component, pageProps }: AppProps) {
  useDarkMode(); // ✅ This is now safely inside the Provider context

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper {...props} /> {/* ✅ Wrap inside a child */}
      </PersistGate>
    </Provider>
  );
}
