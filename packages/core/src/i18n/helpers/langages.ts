import {langagesResources} from '../i18n';

export const getSupportedLangages = ({resources}: langagesResources) => {
  if (resources == null || resources.length === 0) {
    return [];
  }
  return resources.map(langageBundle => langageBundle.lng);
};

export const formatResources = ({resources}: langagesResources) => {
  if (resources == null || resources.length === 0) {
    return {};
  }

  const linkedLangages = {};
  resources.forEach(
    langageBundle =>
      (linkedLangages[langageBundle.lng] = {
        translation: langageBundle.translationsObject,
      }),
  );

  return linkedLangages;
};
