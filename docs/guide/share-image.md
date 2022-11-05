# Share Image

## shareImage

Shares image to a specific scene.

### Type

```typescript
function shareImage(request: {src: string; scene: number}): Promise<boolean>;
```

### Parameters

| Name  | Type   | Required | Default Value | Description                                                  |
| ----- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| src   | String | Yes      | /             | URL for the image to be shared.                              |
| scene | Number | Yes      | /             | Share to Chat:<br />NativeWechatConstants.WXSceneSession<br/>Share on Moments:<br/>NativeWechatConstants.WXSceneTimeline<br/>Shared to Favorites:<br/>NativeWechatConstants.WXSceneFavorite |

### Example

```typescript
import {shareImage, NativeWechatConstants} from 'native-wechat';

shareImage({
      url:'https://hector.im/logo.png',
      scene:NativeWechatConstants.WXSceneFavorite
})
```

