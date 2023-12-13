# Getting Started

## Register SDK

Before invoking any APIs, registering Native WeChat by invoking `registerApp` is essential.

```typescript
import { registerApp } from "native-wechat";

useEffect(() => {
  return registerApp({
    appid: "wx964290141ebe9b7b",
  });
}, []);
```

When invoking `registerApp`, there will be a listener to receive events from Wechat. `registerApp` returns a function to remove the listener, and no events will be received from Wechat.

## Invoking API

Now is the time to invoke API. For example, we will send an auth request to Wechat and receive the code. You may use the API named `sendAuthRequest` here.

```jsx
import { registerApp, sendAuthRequest } from "native-wechat";
import { Button, Text } from "react-native";
import { verifyWechatCode } from "@/api/auth/wechat";

useEffect(() => {
  registerApp({
    appid: "wx964290141ebe9b7b",
  });
}, []);

const onButtonClicked = async () => {
  const {
    data: { code },
  } = await sendAuthRequest();

  await verifyWechatCode(code);
};

return (
  <Button onClick={onButtonClicked}>
    <Text>Send Auth Request</Text>
  </Button>
);
```

Most APIs in Native WeChat are promisified. So is `sendAuthRequest` which will return a promise. When the user confirms the request on Wechat, the promise is resolved to be data with a code. All promisifed APIs return a generic type named `NativeWechatResponse`.

```typescript
export type NativeWechatResponse<T = Record<string, unknown>> = {
  type: string;
  errorCode: number;
  errorStr: string | null;
  data: T;
};
```
