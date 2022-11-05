# Universal Link Checking

iOS Only. 

## checkUniversalLinkReady

Helps to troubleshoot Wechat SDK access problems.

### Type

```typescript
function checkUniversalLinkReady(): Promise<UniversalLinkCheckingResponse>;
```

### Returns

```typescript
type UniversalLinkCheckingResponse = {
  suggestion: string;
  errorInfo: string;
};
```

### Example

```tsx
  useEffect(() => {
    registerApp({
      appid: 'wx96b2px111ebe9b7b',
      log: true,
      universalLink: 'https://hector.im/',
    });

    checkUniversalLinkReady()
      .then(console.log)
      .catch(e => console.log(e));
  }, []);
```

