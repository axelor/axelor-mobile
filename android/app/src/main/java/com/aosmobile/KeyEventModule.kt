package com.aosmobile

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

class KeyEventModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        private var sharedContext: ReactApplicationContext? = null

        fun sendKeyEventToJS(keyCode: Int) {
            sharedContext?.let {
                val params = Arguments.createMap()
                params.putInt("keyCode", keyCode)

                it.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("onKeyPressed", params)
            }
        }
    }

    init {
        sharedContext = reactContext
    }

    override fun getName(): String = "CustomKeyEvent"
}
