export const handleErr = (error, spinner) => {
  if (error) {
    spinner.fail()
    console.error(error)
    process.exit(1)
  }
}
