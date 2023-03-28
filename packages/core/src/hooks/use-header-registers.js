export const useHeaderRegisters = headerRegisters => {
  [...headerRegisters].map(_moduleHook => _moduleHook());
};
