import {Component} from 'vlux'
import React from 'react'

export default class Html extends Component {

  static propTypes = {
    appConfig: React.PropTypes.object.isRequired,
    bodyHtml: React.PropTypes.string.isRequired,
  };

  render() {
    const {bodyHtml, appConfig} = this.props

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"
          />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en" />
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
