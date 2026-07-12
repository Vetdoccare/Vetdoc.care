import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700&family=DM+Sans:wght@400;500&display=swap" as="style" />
          <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          {/* Simple noscript fallback for ads and analytics (kept minimal) */}
          <noscript>
            <div style={{textAlign:'center',padding:8,fontSize:'0.85rem'}}>JavaScript is required for full functionality and ads on this site.</div>
          </noscript>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(){
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
          {/* Place noscript fallbacks for third-party scripts here if needed */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
