package com.isshanvi;

import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;

public class Splash extends AppCompatActivity {
    private static int SPLASH_TIME_OUT = 2000;
    public static Activity activity;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.splash);

        activity = this;

        if(Build.VERSION.SDK_INT >= 21){
            getWindow().setStatusBarColor(ContextCompat.getColor(this, R.color.ishaanvi_status_bar_color));
        }
    }

    @Override
    public void onBackPressed() {

    }
}
