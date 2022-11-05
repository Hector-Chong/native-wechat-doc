# Authorization

## sendAuthRequest

Sends an authorization request to Wechat. Once the user confirms the request, it will return data from Wechat.

### Type

```typescript
function sendAuthRequest(request: {scope: string; state?: string}): Promise<SendAuthRequestResponse>;
```

### Parameters

| Name  | Type   | Required | Default Value     | Description                                                  |
| ----- | ------ | -------- | ----------------- | ------------------------------------------------------------ |
| scope | String | Yes      | "snsapi_userinfo" | App authorization scope. To obtain the user's personal information, enter snsapi_userinfo. |
| state | String | No       | ""                | Used to maintain the request and callback status. It is returned unchanged to the third party after the authorization request. This parameter can be used to prevent any cross-site request forgery (csrf) attack. |

### Returns

```typescript
type SendAuthRequestResponse = NativeWechatResponse<{
  code: string;
  country: string;
  lang: string;
  state: string;
}>;

type NativeWechatResponse<T = Recordable> = {
  type: string;
  errorCode: number;
  errorStr: string | null;
  transaction: string | null;
  data: T;
};

type Recordable<T = any> = Record<string, T>;
```

### Example

```typescript
const data = await sendAuthRequest({scope: 'snsapi_userinfo'});

console.log(data); // {"data": {"code": "07FJDp0w337OpFk0eW2w3YYMAF4Kth0P", "state": ""}, "errorCode": 0, "errorStr": "", "type": "SendAuthResp"}
```

