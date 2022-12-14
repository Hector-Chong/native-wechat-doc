# Payment

## requestPayment

Requests a WeChat Pay payment.

### Type

```typescript
function requestPayment(request: {
  partnerId: string;
  prepayId: string;
  nonceStr: string;
  timeStamp: string;
  sign: string;
}): Promise<NativeWechatResponse>;
```

### Parameters

These parameters should be determined by application servers communicating with WeChat.

| Name      | Type   | Required | Default Value | Description                                |
| --------- | ------ | -------- | ------------- | ------------------------------------------ |
| partnerId | String | Yes      | /             | Merchant ID assigned by WeChat Pay.        |
| prepayId  | String | Yes      | /             | Prepayment session ID generated by WeChat. |
| nonceStr  | String | Yes      | /             | Random string, not longer than 32 digits.  |
| timeStamp | String | Yes      | /             | The current time.                          |
| sign      | String | Yes      | /             | SHA256 Signature.                          |

### Note

According to WeChat, the returned result does not represent the payment status. When the promise is resolved, please send a payment checking request to the server before giving feedback to the users.
