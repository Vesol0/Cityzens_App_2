import React, {useEffect, useRef} from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// code for embed tweet
const EmbedTweet = ({ tweetId }) => {
const webviewRef = useRef(null); // https://react.dev/reference/react/useRef
  const injectedJavaScript = `
    document.body.style.backgroundColor = 'transparent';
    document.body.style.padding = '0';
    document.body.style.margin = '0';
    window.onload = function() {
      twttr.widgets.load();
    };
  `;

  const tweetEmbedHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <blockquote class="twitter-tweet">
          <a href="https://twitter.com/x/status/${tweetId}"></a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </body>
    </html>
  `;
    // callback ui, update ui.
  useEffect(() => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(injectedJavaScript);
    }
  }, []);
  // display webview 
  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: tweetEmbedHtml }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  webview: {
    width: Dimensions.get('window').width - 20,
    height: 400,
    maxHeight: 300
    ,
  },
});

export default EmbedTweet;