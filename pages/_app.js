import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store.ts";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    //DEV ONLI!!!
    window.store = store;
  });
  return (
    <Provider store={store}>
      <div className='global'>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
