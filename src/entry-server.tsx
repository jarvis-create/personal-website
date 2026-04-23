import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "./App";
import { getSeoForPath, renderSeoHead } from "./seo";

export function render(url: string) {
  return {
    appHtml: renderToString(
      <StrictMode>
        <App initialPath={url} />
      </StrictMode>
    ),
    headHtml: renderSeoHead(getSeoForPath(url)),
  };
}
