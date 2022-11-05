# Share Text

## shareText

Shares text to a specific scene.

### Type

```typescript
function shareText(request: {text: string; scene: number}): Promise<boolean>;
```

### Parameters


| Name  | Type   | Required | Default Value | Description                                                  |
| ----- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| text  | String | Yes      | /             | Text to be shared.                                           |
| scene | Number | Yes      | /             | Share to Chat:<br />NativeWechatConstants.WXSceneSession<br/>Share on Moments:<br/>NativeWechatConstants.WXSceneTimeline<br/>Shared to Favorites:<br/>NativeWechatConstants.WXSceneFavorite |

### Example

```typescript
import {shareText, NativeWechatConstants} from 'native-wechat';

shareText({
      text:'Hello Hector!',
      scene:NativeWechatConstants.WXSceneFavorite
})
```

