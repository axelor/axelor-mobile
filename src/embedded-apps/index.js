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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '@axelor/aos-mobile-ui';
import {EmbeddedAppView, useDownloadedBundle} from '@axelor/aos-mobile-core';

/*
 * Apps are served by their AOS module (<aos>/<remotePath>/), downloaded after login,
 * cached per version and usable offline.
 */
const APPS = {
  skillPlanning: {
    appId: 'employee-skill-planning',
    remotePath: 'employee-skill-planning',
    params: {id: '1'},
    recordScreens: {},
  },
  leaveEditor: {
    appId: 'leave-editor',
    remotePath: 'hr/leave-editor',
    params: {},
    recordScreens: {},
  },
};

const Message = ({title, detail, onRetry}) => (
  <View style={styles.message}>
    <Text writingType="important">{title}</Text>
    {detail != null && <Text writingType="details">{detail}</Text>}
    {onRetry != null && <Button title="Retry" onPress={onRetry} />}
  </View>
);

const createAppScreen =
  ({appId, remotePath, params, recordScreens}) =>
  () => {
    const {
      status,
      bundle,
      usingCacheOffline,
      updateReady,
      progress,
      error,
      refresh,
    } = useDownloadedBundle(appId, remotePath);

    if (status === 'error') {
      return (
        <Message
          title="Could not download the app"
          detail={error}
          onRetry={refresh}
        />
      );
    }
    if (status !== 'ready' || bundle == null) {
      return (
        <Message
          title={
            status === 'downloading'
              ? 'Downloading app…'
              : 'Checking for updates…'
          }
          detail={
            progress != null
              ? `${progress.done} of ${progress.total} files`
              : null
          }
        />
      );
    }
    return (
      <View style={styles.fill}>
        <View style={styles.banner}>
          <Text writingType="details" style={styles.bannerText}>
            {usingCacheOffline
              ? `Server unreachable, using cached ${bundle.version} (${error})`
              : updateReady
              ? `Update downloaded, it opens next time (running ${bundle.version})`
              : `Version ${bundle.version}`}
          </Text>
          <Button title="Check for update" onPress={refresh} width={170} />
        </View>
        <EmbeddedAppView
          bundle={bundle}
          params={params}
          recordScreens={recordScreens}
        />
      </View>
    );
  };

export const EmbeddedAppsModule = {
  name: 'app-embedded',
  title: 'EmbeddedApps_Title',
  subtitle: 'EmbeddedApps_Title',
  icon: 'window-stack',
  embeddedApps: Object.values(APPS).map(({appId, remotePath}) => ({
    id: appId,
    path: remotePath,
  })),
  menus: {
    embedded_skill_planning: {
      title: 'EmbeddedApps_SkillPlanning',
      icon: 'calendar-range',
      screen: 'EmbeddedSkillPlanningScreen',
    },
    embedded_leave_editor: {
      title: 'EmbeddedApps_LeaveEditor',
      icon: 'calendar-plus',
      screen: 'EmbeddedLeaveEditorScreen',
    },
  },
  screens: {
    EmbeddedSkillPlanningScreen: {
      title: 'EmbeddedApps_SkillPlanning',
      component: createAppScreen(APPS.skillPlanning),
    },
    EmbeddedLeaveEditorScreen: {
      title: 'EmbeddedApps_LeaveEditor',
      component: createAppScreen(APPS.leaveEditor),
    },
  },
  translations: {
    en: {
      EmbeddedApps_Title: 'Embedded apps',
      EmbeddedApps_SkillPlanning: 'Skill planning',
      EmbeddedApps_LeaveEditor: 'Leave editor',
    },
    fr: {
      EmbeddedApps_Title: 'Apps embarquées',
      EmbeddedApps_SkillPlanning: 'Planning des compétences',
      EmbeddedApps_LeaveEditor: 'Éditeur de congés',
    },
  },
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  message: {
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  bannerText: {
    flex: 1,
  },
});
