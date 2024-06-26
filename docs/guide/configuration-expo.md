# Configuration

## Update `app.json`

Open `app.json` and add the following information:

```js
{
    // Add your WeChat app ID
    "scheme": ["wx123456nxabcdefg"],
    "ios": {
      // Add iOS queries schemes of WeChat
      "infoPlist": {
        "LSApplicationQueriesSchemes": [
          "weixin",
          "weixinULAPI",
          "weixinURLParamsAPI"
        ]
      },
      // Add your iOS universal link
      // Example "applinks:(google.com)"
      "associatedDomains": ["applinks:(Universal Link Here)"]
    },
    // Add Expo Native Wechat plugin
    "plugins": ["expo-native-wechat"]
}
```

## Pre-build (Optional)

If you are using pre-build, make sure you've executed `expo prebuild` for updating preb-build projects.
