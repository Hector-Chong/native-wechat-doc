# Share Webpage

## shareWebpage

Shares a webpage to a specific scene.

### Type

```typescript
function shareWebpage(request: {
  webpageUrl: string;
  title?: string;
  description?: string;
  coverUrl?: string;
  scene: number;
}): Promise<boolean>;
```

### Parameters

| Name            | Type   | Required | Default Value | Description                                                  |
| --------------- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| webpageUrl      | String | Yes      | /             | URL for the webpage be shared.                               |
| title           | String | No       | /             | Message title.                                               |
| description     | String | No       | /             | Description.                                                 |
| coverUrl        | String | No       | /             | Message cover image.                                         |
| scene           | Number | Yes      | /             | Share to Chat:<br />NativeWechatConstants.WXSceneSession<br/>Share on Moments:<br/>NativeWechatConstants.WXSceneTimeline<br/>Shared to Favorites:<br/>NativeWechatConstants.WXSceneFavorite |

### Example

```typescript
import {shareWebpage, NativeWechatConstants} from 'native-wechat';

shareWebpage({
      title:'Héctor Chong',
      description:'A Web FE / Cross-Platform Developer in Beijing.',
      webpageUrl: 'https://hector.im',
      scene: NativeWechatConstants.WXSceneFavorite,
      coverUrl: 'https://hector.im/avatar.webp'
})
```

