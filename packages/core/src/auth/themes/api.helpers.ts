import {createStandardSearch} from '../../apiProviders';

export async function fetchWebThemes() {
  return createStandardSearch({
    model: 'com.axelor.meta.db.MetaTheme',
    criteria: [{fieldName: 'isSelectable', operator: '=', value: true}],
    fieldKey: 'auth_metaTheme',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}
