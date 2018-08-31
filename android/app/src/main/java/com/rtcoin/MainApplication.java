package com.rtcoin;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import io.realm.react.RealmReactPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.xb.contactpicker.ReactNativeContacts;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import cn.jpush.reactnativejpush.JPushPackage;
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

   // 设置为 true 将不弹出 toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为 true 将不打印 log
    private boolean SHUTDOWN_LOG = false;

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LinearGradientPackage(),
            new RealmReactPackage(),
            new MPAndroidChartPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeContacts(),
            new ReactVideoPackage(),
            new ImagePickerPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new WeChatPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
