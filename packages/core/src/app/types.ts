export interface proxy {
  defaultUrl: string;
  defaultUsername: string;
  defaultPassword: string;
}

export interface releaseConfig {
  url: string;
  showUrlInput: boolean;
}

export interface versionCheckConfig {
  activate: boolean;
  android: string;
  ios: string;
}
