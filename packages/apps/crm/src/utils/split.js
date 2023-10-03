export const getFirstNameAndName = nameToSplit => {
  const fullName = nameToSplit?.split(' ');
  if (fullName?.length === 2) {
    return {firstName: fullName[0], lastName: fullName[1]};
  } else {
    return {firstName: '', lastName: ''};
  }
};
