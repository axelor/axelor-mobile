export function testProps(id: string): {
  testID: string;
  accessibilityLabel: string;
} {
  return {
    testID: id.replace(/[^a-zA-Z0-9]/g, '_'),
    accessibilityLabel: id.replace(/[^a-zA-Z0-9]/g, '_'),
  };
}
