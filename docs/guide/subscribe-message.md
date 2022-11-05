# Subscribe Message

Developers can use the one-time message subscription authorization feature to enable third-party Apps or official accounts to send a  message to authorized users. Authorized users do not have to follow the Official Accounts. Each time a WeChat user grants authorization, the developer can get permission to send a message to Service Notification.

## requestSubscribeMessage

Sends a request to subscribe one-time message.

### Type

```typescript
function shareWebpage(request: {
  scene: number;
  templateId: string;
  reserved?: string;
}): Promise<boolean>;
```

### Parameters

| Name       | Type   | Required | Default Value | Description                                |
| ---------- | ------ | -------- | ------------- | ------------------------------------------ |
| scene      | Number | Yes      | /             | Identifies the subscription scene value.   |
| templateId | String | Yes      | /             | Subscription message template ID.          |
| reserved   | String | No       | /             | Maintains the request and callback status. |