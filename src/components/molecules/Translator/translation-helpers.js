export function reduceTranslationsToI18nResources(translations) {
  return translations.reduce((resources, translation) => {
    resources[translation.key] = translation.value;
    return resources;
  }, {});
}
