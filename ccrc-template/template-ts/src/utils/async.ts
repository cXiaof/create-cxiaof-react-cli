export const sleep = (time: number = 1000 / 60): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
