import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // we created history in this function because
  // we want to sync history of this object to that of container project
  const history =
    defaultHistory ||
    createMemoryHistory({
      // provide memory history a initial path
      initialEntries: [initialPath],
    });
  if (onNavigate) {
    // when ever path changes, call onNavigate callback from container
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, el);
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation.
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    // if dev mode, we provide browser history as default
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
