export const waitFor = (time: number): Promise<void> =>
  new Promise((res) => setTimeout(res, time));
