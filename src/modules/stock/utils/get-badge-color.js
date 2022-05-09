function getBadgeColor(status) {
  if (status === 'Draft') {
    return {
      backgroundColor: 'rgba(206, 206, 206, 0.6)',
      borderColor: 'rgba(206, 206, 206, 1)',
    };
  } else {
    return {
      backgroundColor: '#84DCB7',
      borderColor: '#3ECF8E',
    };
  }
}

export default getBadgeColor;
