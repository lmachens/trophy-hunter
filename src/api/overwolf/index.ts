// Creates magic proxy to avoid crashes non-overwolf environments

if (typeof overwolf === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  globalThis.overwolf = new Proxy(
    () => {
      return;
    },
    {
      get() {
        return overwolf;
      }
    }
  );
}

export default overwolf;
