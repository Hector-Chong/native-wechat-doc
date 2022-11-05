# Configuration

## Code Modifications

Native WeChat requires you to modify the native code for WeChat to handle some callbacks. For example, if a WePay payment is finished, React Native will not receive the payment status without modifications.

## iOS

Paste the code below to  `AppDelegate.m`

```objective-c
@implementation AppDelegate
// ...
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  [WXApi handleOpenURL:url delegate:self];
  
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [WXApi handleOpenURL:url delegate:self];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
  
  return [WXApi handleOpenUniversalLink:userActivity delegate:self];
}

@end
```

Then, open `AppDelegate.h` and import `WXApi.h` at the beginning.
```objective-c
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "WXApi.h"
```

After that, add the protocol `WXApiDelegate` to `UIResponder`.

```objective-c
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, WXApiDelegate>
```

The file will look like this:

```objective-c
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "WXApi.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, WXApiDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
```

## Android

First, find `MainApplication.java` inside `android` folder. Once you locate it, you need to create a folder named `wxapi` where you put these two files below.
````java
// WXEntryActivity.java
package <Package Name>;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class WXEntryActivity extends Activity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    try {
      Intent intent = getIntent();
      Intent intentToBroadcast = new Intent();

      intentToBroadcast.setAction("com.hector.nativewechat.ACTION_REDIRECT_INTENT");
      intentToBroadcast.putExtra("intent", intent);

      sendBroadcast(intentToBroadcast);

      finish();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

```java
// WXPayEntryActivity.java
package <Package Name>;

import android.app.Activity;
import android.os.Bundle;

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        finish();
    }
}

````

`<Package Name>` must be replaced by your package name suffixed with `.wxapi`. You can find the package name of your App in `MainApplication` or `MainActivity`. Let's say it is `com.ReactNative`, and the package name of these files should be `com.ReactNative.wxapi`.

Then, open `/android/app/src/main/AndroidManifest.xml` and add the tag `<queries>` inside `<manifest>`:

```xml
  <queries>
    <package android:name="com.tencent.mm" />
  </queries>
```

Finally, add two activities inside `<application>` and remember to replace `<Your Package Name>`:

 ```xml
     <activity
       android:name=".wxapi.WXEntryActivity"
       android:exported="true"
       android:label="@string/app_name"
       android:launchMode="singleTask"
       android:taskAffinity="<Your Package Name>"
       android:theme="@android:style/Theme.Translucent.NoTitleBar" />
     <activity
       android:name=".wxapi.WXPayEntryActivity"
       android:exported="true"
       android:label="@string/app_name" />
 ```

The file should look like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="<Your Package Name>">
  //...

  <queries>
    <package android:name="com.tencent.mm" />
  </queries>
  
   <application
    android:name=".MainApplication"
     //...>
     // ...
    <activity
      android:name=".wxapi.WXEntryActivity"
      android:exported="true"
      android:label="@string/app_name"
      android:launchMode="singleTask"
      android:taskAffinity="<Your Package Name>"
      android:theme="@android:style/Theme.Translucent.NoTitleBar" />
    <activity
      android:name=".wxapi.WXPayEntryActivity"
      android:exported="true"
      android:label="@string/app_name" />
  </application>
</manifest>
```

