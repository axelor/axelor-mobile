export const generateChartProps = (datasets, Color) => {
  const defaultColors = [
    Color.primaryColor.background,
    Color.infoColor.background,
    Color.errorColor.background,
    Color.progressColor.background,
    Color.secondaryColor.background,
  ];
  const props = {};

  datasets.forEach((dataset, index) => {
    const color = dataset[0]?.color || defaultColors[index];
    props[`dataPointsColor${index + 1}`] = color;
    props[`color${index + 1}`] = color;
    if (index === 0) {
      // eslint-disable-next-line dot-notation
      props['data'] = dataset;
    } else {
      props[`data${index + 1}`] = dataset;
    }
  });
  console.log(props);
  return props;
};
