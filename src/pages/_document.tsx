import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '@emotion/server';
import { EmotionCritical } from '@emotion/server/create-instance';

class MyDocument extends Document<EmotionCritical> {
  render() {
    return (
      <Html>
        <Head>
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ({ renderPage }) => {
  const page = await renderPage();
  const styles = extractCritical(page.html);
  return { ...page, ...styles };
};

export default MyDocument;
