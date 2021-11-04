const asyncTool = {
    sleep: (time) => new Promise((resolve) => setTimeout(resolve, time)),
}

export default asyncTool
