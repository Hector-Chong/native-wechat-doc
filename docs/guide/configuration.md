# Configuration

## Code Modifications

Native WeChat requires you to modify the native code for WeChat to handle some callbacks. For example, if a WePay payment is finished, React Native will not receive the payment status without modifications.


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

## iOS React Native 0.74 and above

The modification of `AppDelegate.m` is the same as described above.

Import two headers `WXApi.h` and `<React/RCTLinkingManager.h>`. And add `WXApiDelegate` to `RCTAppDelegate`.

```objective-c
#import "WXApi.h"
#import <React/RCTLinkingManager.h>

@interface AppDelegate : RCTAppDelegate<WXApiDelegate>

@end
```

## iOS (New Architecture)

First, find `AppDelegate.m` inside `ios` folder, and rename it to `AppDelegate.mm`.

Then, import headers and extend AppDelegate interface at the top of the file.

```objective-c
#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

static NSString *const kRNConcurrentRoot = @"concurrentRoot";

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif
```

Find the method declared as `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`, and setup some properties for the new architecture.

```objective-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTAppSetupPrepareApp(application);

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif

// ...
```

Insert the code below into `@implementation AppDelegate` to implement specific methods.

```objective-c
#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif
```

The file should look like this:
```objective-c
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

#import <React/RCTAppSetupUtils.h>

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

static NSString *const kRNConcurrentRoot = @"concurrentRoot";

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTAppSetupPrepareApp(application);

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif

  NSDictionary *initProps = [self prepareInitialProps];
  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"<Your Project Name>", initProps);

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// ...

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}
a
#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

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

The rest steps are the same as in the [iOS](/guide/configuration.html#ios) section.


