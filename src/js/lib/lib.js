import fs from 'fs';
import chalk from 'chalk';

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data)=>{
      if(err) { reject(err) }
      data = data.replace(/\n$/, '')
      const output = data.split("\n")
      const credentials = {}
      output.map((datum)=>{
        var creds = datum.split("=")
        credentials[creds[0]] = creds[1]
      })
      resolve(credentials)
    })
  })
}

function parseResponse(response) {
  const latestBuild = response[0]
  if(latestBuild.outcome === 'success') {
    console.log(chalk.green('Congrats! Your current build is passing!'))
  } else {
    const latestBrokenBuilds = latestBuild.build_num - latestBuild.previous_successful_build.build_num
    const workingBuildDate = new Date(response[latestBrokenBuilds].committer_date)
    const brokenBuildDate = new Date(latestBuild.committer_date)

    console.log(chalk.red('Uh oh, looks like your current build is broken. \n \n' + 'It has been: '))
    console.log(chalk.red.bgCyan.bold(daysSinceLastWorkingBuild(workingBuildDate, brokenBuildDate)) + " since your last working build \n \n")
    console.log(chalk.red('Details on your latest broken builds: \n'))
    console.log(chalk.red(showLatestBrokenBuilds(response, latestBrokenBuilds)))
    //console.log(chalk.red(response[latestBrokenBuilds].committer_name))
    //console.log(chalk.red(response[latestBrokenBuilds].subject))
    //console.log(chalk.red(new Date(response[latestBrokenBuilds].committer_date)))
  }
}

function daysSinceLastWorkingBuild(last, current) {
  let timeDiff = current - last
  const timeObj = {
    'days': 1000*60*60*24,
    'hours': 1000*60*60,
    'minutes': 1000*60,
    'seconds': 1000
  }
  let timeString = ''
  for(var i=0; i<Object.keys(timeObj).length; i++) {
    if(timeDiff > 0) {
      let type = Object.keys(timeObj)[i]
      let timeMods = Math.floor(timeDiff/parseInt(timeObj[type]))
      timeDiff -= timeMods * parseInt(timeObj[type])
      timeString += timeMods + " " + type + " "
    }
  }
  return timeString
}

function showLatestBrokenBuilds(allBuilds, numberBroken) {
  const allBrokenBuilds = allBuilds.splice(0, numberBroken-1);
  let buildStatus = ''
  allBrokenBuilds.map((build)=>{
    buildStatus += build.committer_name + "\n" + build.committer_date + "\n" + build.subject + "\n" + "=============== \n"
  })
  return buildStatus;
}

export {readFile, parseResponse}
