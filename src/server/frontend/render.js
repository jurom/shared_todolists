import Html from './html.react'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import config from '../config'

export default function render(req, res) {
  return renderPage(req, res)
}

function renderPage(req, res) {
  return new Promise((resolve, reject) => {

    const appConfig = {}
    const html = getPageHtml({hostname: req.hostname, appConfig})
    res.status(200).send(html)
    resolve()

  })
}

function getPageHtml({hostname, appConfig}) {
  const appHtml = `<div id="app"></div>`

  const appScriptSrc = config.useWebpackDevServer
    ? `//${hostname}:${config.hotPort}/build/app.js`
    : '/build/app.js?v=' + config.version

  /* eslint-disable */
  let scriptHtml = `
    <script>
      (function() {
        var s = document.getElementsByTagName('body')[0];
        var app = document.createElement('script');
        app.type = 'text/javascript';
        app.async = true;
        app.src = '${appScriptSrc}';
        s.appendChild(app);
      })()

      try {Typekit.load({ async: true })} catch(e){}
    </script>`

  /* eslint-enable */
  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      appConfig={appConfig}
    />
  )
}
