/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.axelor.aosmobile.core;

import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ErrorFeedbackModule extends ReactContextBaseJavaModule {

    private static final int ERROR_TONE_DURATION_MS = 1000;

    ErrorFeedbackModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AosErrorFeedback";
    }

    @ReactMethod
    public void playErrorTone() {
        ToneGenerator toneGenerator;
        try {
            toneGenerator = new ToneGenerator(AudioManager.STREAM_NOTIFICATION, ToneGenerator.MAX_VOLUME);
        } catch (RuntimeException e) {
            return;
        }

        toneGenerator.startTone(ToneGenerator.TONE_SUP_ERROR, ERROR_TONE_DURATION_MS);
        new Handler(Looper.getMainLooper()).postDelayed(toneGenerator::release, ERROR_TONE_DURATION_MS + 100);
    }
}
