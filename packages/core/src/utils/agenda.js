export function updateAgendaItems(previousData, payload) {
  if (payload == null) {
    return previousData;
  }
  const allData = [...previousData, ...payload];
  const mapIdToItem = allData.map(item => [item.id, item]);
  const mapWithoutDuplicates = new Map(mapIdToItem);
  const arrayWithoutDuplicates = [...mapWithoutDuplicates.values()];

  return arrayWithoutDuplicates;
}
