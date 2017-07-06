import renderToString from "preact-render-to-string";
import streamTemplate from "stream-template";
import assetTags from "./assetTags";

export default function createRenderStream({ title, headerTags, app }) {
    const renderedHeaderTags = Promise.resolve(headerTags).then(nodes =>
        nodes.map(renderToString).reduce((str, tag) => str + tag, "")
    );
    const renderedApp = Promise.resolve(app).then(app => renderToString(app));

    return streamTemplate`<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="theme-color" content="#000000" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <title>${ title }</title>
  ${ assetTags() }
  ${ renderedHeaderTags }
</head>
<body>
  ${ renderedApp }
</body>
</html>
`;
}
