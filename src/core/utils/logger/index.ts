let Logger:any = {
    debug: (message:string) => {console.log(message)},
    error: (message:string) => {console.log(message)},
    warn: (message:string) => {console.log(message)},
    info: (message:string) => {console.log(message)}
};

export {
    Logger
}