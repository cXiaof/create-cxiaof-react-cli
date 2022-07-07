export const sleep = (time = 1000 / 60) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
