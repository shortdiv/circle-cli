import program from 'commander';
import {CircleCLI} from 'makeReq' //should rename to index//
import {readFile, parseResponse} from 'lib/lib'
const version = require('./package.json').version;

program
  .version(version)
  .arguments('<filename>')
  .action((filename) => {
    readFile(filename).then((dataObject)=>{
      const circle = new CircleCLI(dataObject)
      circle.makeRequest().then((response) => {
        parseResponse(response.body)
      })
    })
  })
  .parse(process.argv)
