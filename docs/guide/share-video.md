# Share Video

## shareVideo

Shares video to a specific scene.

### Type

```typescript
function shareVideo(request: {
  videoUrl: string;
  scene: number;
  title?: string;
  description?: string;
  videoLowBandUrl?: string;
  coverUrl?: string;
}): Promise<boolean>;
```

### Parameters

| Name            | Type   | Required | Default Value | Description                                                  |
| --------------- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| videoUrl        | String | Yes      | /             | URL for the video to be shared.                              |
| title           | String | No       | /             | Message title.                                               |
| description     | String | No       | /             | Description.                                                 |
| videoLowBandUrl | String | No       | /             | URL for the Video  in the low bandwidth environment.         |
| coverUrl        | String | No       | /             | Message cover image.                                         |
| scene           | Number | Yes      | /             | Share to Chat:<br />NativeWechatConstants.WXSceneSession<br/>Share on Moments:<br/>NativeWechatConstants.WXSceneTimeline<br/>Shared to Favorites:<br/>NativeWechatConstants.WXSceneFavorite |

### Example

```typescript
import {shareVideo, NativeWechatConstants} from 'native-wechat';

shareVideo({
      title:'Hectors Birthday Video',
      description:'A goods thing to watch',
      videoUrl:'https://hector.im/video.mp4',
      videoLowBandUrl:'https://hector.im/video_small.mp4',
      scene:NativeWechatConstants.WXSceneFavorite
})
```

