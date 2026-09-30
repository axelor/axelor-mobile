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

export {default as EmbeddedAppView} from './EmbeddedAppView';
export type {
  EmbeddedAppViewProps,
  RecordScreenResolver,
  RecordScreenTarget,
} from './EmbeddedAppView';
export {readCachedBundle, syncDownloadedBundle} from './bundles';
export type {
  DownloadOptions,
  EmbeddedBundle,
  EmbeddedManifest,
} from './bundles';
export {
  useDownloadedBundle,
  usePrefetchEmbeddedApps,
} from './use-embedded-bundle';
export type {DownloadedBundleState} from './use-embedded-bundle';
export {PROTOCOL_VERSION, HostError} from './protocol';
export type {HostErrorCode} from './protocol';
export {registerAppBridgeHandler} from './data-handlers';
export type {BridgeHandler, BridgeHandlerContext} from './data-handlers';
