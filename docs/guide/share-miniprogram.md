# Share Miniprogram

## shareMiniProgram

Shares a Wechat mini-program to chat.

### Type

```typescript
function shareMiniProgram(request: {
  userName: string;
  path: string;
  miniProgramType: number;
  webpageUrl: string;
  withShareTicket?: boolean;
  title?: string;
  description?: string;
  coverUrl?: string;
}): Promise<boolean>;
```

### Parameters

| Name            | Type    | Required | Default Value | Description                                                  |
| --------------- | ------- | -------- | ------------- | ------------------------------------------------------------ |
| userName        | String  | Yes      | /             | User name of Wechat mini-program.                             |
| path            | String  | Yes      | /             | Path.                                                        |
| miniProgramType | Number  | Yes      | /             | Release:<br />NativeWechatConstants.WXMiniProgramTypeRelease<br/>Preview:<br/>NativeWechatConstants.WXMiniProgramTypePreview<br/>Test:<br/>NativeWechatConstants.WXMiniProgramTypeTest |
| webpageUrl      | String  | Yes      | /             | If the version of WeChat is incompatible with the mini-program to be shared, a webpage will be opened instead. |
| withShareTicket | Boolean | No       | false         | Indicates whether to share with shareTicket.                 |
| title           | String | No       | /             | Message title.                                               |
| description     | String | No       | /             | Description.                                                 |
| coverUrl        | String | No       | /             | Message cover image.                                         |

### Example

```typescript
import {shareMiniProgram, NativeWechatConstants} from 'native-wechat';

shareMiniProgram({
      userName: 'gh_6e95p0mnc213',
      path: '/pages/home/index',
      miniprogramType: NativeWechatConstants.WXMiniProgramTypePreview,
      webpageUrl: 'https://hector.im',
});
```

