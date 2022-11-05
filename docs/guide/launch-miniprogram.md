# Launch Miniprogram

## launchMiniProgram

Launches a WeChat mini-program.

### Type

```typescript
function launchMiniProgram(request: {
  userName: string;
  path: string;
  miniProgramType: number;
  onNavBack?: (res: LaunchMiniProgramResponse) => void;
}): Promise<boolean>;

type LaunchMiniProgramResponse = NativeWechatResponse<{
  extMsg?: string;
}>;
```

### Parameters

| Name            | Type                                    | Required | Default Value | Description                                                  |
| --------------- | --------------------------------------- | -------- | ------------- | ------------------------------------------------------------ |
| userName        | String                                  | Yes      | /             | User name of Wechat mini-program.                            |
| path            | String                                  | Yes      | /             | Path.                                                        |
| miniProgramType | Number                                  | Yes      | /             | Release:<br />NativeWechatConstants.WXMiniProgramTypeRelease<br/>Preview:<br/>NativeWechatConstants.WXMiniProgramTypePreview<br/>Test:<br/>NativeWechatConstants.WXMiniProgramTypeTest |
| onNavBack       | (res:LaunchMiniProgramResponse) => void | No       | /             | When the mini-program navigates back to your App, this function will be called. |

### Example

```typescript
import {launchMiniProgram} from 'native-wechat';

launchMiniProgram({
      userName: 'gh_6095mkozc213',
      path: '/pages/home/index',
      miniProgramType: NativeWechatConstants.WXMiniProgramTypePreview,
});

```

