const path = require('path')

//getting the args
const argv = process.argv.slice(2)
const args = {}

//putting args in a key value pair
let foundEnv  = false
for(let i = 0; i < argv.length; i++){
    if(foundEnv){
        let keyValuePair = argv[i].split('=')
        args[keyValuePair[0]] = keyValuePair[1]
    }
    if(argv[i] === "--env" && !foundEnv){
        foundEnv = true
    }
}

//mode of code optimization development/production/none
let mode = ""
switch(args.optimization){
    case "dev":
        mode = "development"
    break
    case "prod":
        mode = "production"
    break
    case "none":
        mode = "none"
    break
    default:
        mode = "production"
    break
}

console.log(`${mode} mode`)

//exporting module
module.exports = [
    {
        entry: "./main.js",
        name: "index",
        mode: mode,
        output:{
            filename: "index.js",
            path: path.resolve(__dirname,"dist")
        }
    },
    {
        entry: "./list.js",
        name: "list",
        mode: mode,
        output:{
            filename: "list.js",
            path: path.resolve(__dirname,"dist")
        }
    }
]