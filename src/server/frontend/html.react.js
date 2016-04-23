import {Component} from 'vlux'
import React from 'react'

export default class Html extends Component {

  static propTypes = {
    appConfig: React.PropTypes.object.isRequired,
    bodyHtml: React.PropTypes.string.isRequired,
    config: React.PropTypes.object.isRequired,
    version: React.PropTypes.string.isRequired
  };

  render() {
    const {bodyHtml, appConfig, config, version} = this.props

    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = !config.useWebpackDevServer &&
      <link
        href={`/build/app.css?v=${version}`}
        rel="stylesheet"
      />

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"
          />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en" />
          <link rel="stylesheet" type="text/css"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
          {linkStyles}
        </head>
        <body
          style={{}}
          data={JSON.stringify(appConfig)}
          dangerouslySetInnerHTML={{__html: bodyHtml}}
        />
      </html>
    )
  }

}
