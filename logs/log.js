import fs from 'fs'
const yellow = "\x1b[33m%s\x1b[0m"
const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m%s"
const FgRed = "\x1b[31m%s"
const FgGreen = "\x1b[32m%s"
const FgYellow = "\x1b[33m%s"
const FgViolet = "\x1b[34m%s"
const FgMagenta = "\x1b[35m%s"
const FgCyan = "\x1b[36m%s"
const FgWhite = "\x1b[37m%s"
const logpath =  process.env.LOG || ""
const logMessage = process.env.LOVE
export const write = (data) =>{

}
export const debug = (value,tag=`{${logMessage}}`)=>{
    console.log(FgGreen,"[DEBUG]",`{${tag}}`,value)
    console.log(Reset)
}

export const warn = (value,tag=`{${logMessage}}`)=>{
    console.log(FgYellow,"[WARN]",`{${tag}}`,value)
    console.log(Reset)
}
export const info = (value,tag=`{${logMessage}}`) =>{
    console.log(FgMagenta,"[INFO]",`{${tag}}`,value)
    console.log(Reset)
}
export const error = (value,tag=`{${logMessage}}`)=>{
    console.log(FgRed,"[ERROR]",`{${tag}}`,value)
    console.log(Reset)
}