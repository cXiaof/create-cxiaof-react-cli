module.exports = (error, spinner) => {
    if (error) {
        spinner.fail()
        console.error(`error: ${error}`)
        process.exit(1)
    }
}
