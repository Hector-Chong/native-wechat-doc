# Customer Service

## openCustomerService

Opens a Wechat Customer Service chat.

### Type

```typescript
function openCustomerService(request: {corpid: string; url: string}): Promise<boolean>;
```

### Parameters

| Name   | Type   | Required | Default Value | Description                                                  |
| ------ | ------ | -------- | ------------- | ------------------------------------------------------------ |
| corpid | String | Yes      | /             | Corporation ID from https://kf.weixin.qq.com/                |
| url    | String | Yes      | /             | URL for customer service chat from https://kf.weixin.qq.com/ |