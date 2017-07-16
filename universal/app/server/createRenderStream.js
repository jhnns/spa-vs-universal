import renderToString from "preact-render-to-string";
import streamTemplate from "stream-template";
import serializeJavascript from "serialize-javascript";
import assetTags from "./assetTags";

export default function createRenderStream({ title, headerTags, html, css, state, chunks }) {
    const renderedHeaderTags = Promise.resolve(headerTags).then(nodes =>
        nodes.map(renderToString).reduce((str, tag) => str + tag, "")
    );
    const renderedState = state.then(state => serializeJavascript(state, { isJSON: true, space: 0 }));

    return streamTemplate`<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="theme-color" content="#000000" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <title>${ title }</title>
  ${ renderedHeaderTags }
  <style>
    ${ css }
  </style>
  ${ assetTags("client") }
  ${ chunks.then(chunkNames => chunkNames.map(assetTags).join("")) }
</head>
<body>
  ${ html }
</body>
<script>
  window.__PRELOADED_STATE__ = ${ renderedState };
</script>
</html>
`;
}
