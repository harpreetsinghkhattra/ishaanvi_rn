package custom;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.isshanvi.R;
import com.isshanvi.Splash;

public class CommonModule extends ReactContextBaseJavaModule {

    public CommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidCommon";
    }

    @ReactMethod
    public void closeSplashScreen(){

        Log.d("cancel", "splash screen");
        Splash.activity.finish();
        Splash.activity.overridePendingTransition(R.anim.catalyst_fade_in, R.anim.catalyst_fade_out);
    }
}
