import request from 'request';

export class CircleCLI {
  constructor(config) {
    this.config = config
  }

  makeRequest() {
    return new Promise((resolve, reject) => {
      const vcs = this.config.vcs,
            username = this.config.username,
            project = this.config.project,
            options = {
              method: 'GET',
              uri: `https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}`,
              qs: {
                'circle-token': this.config.token
              },
              json: true
            }
      request(options, (error, response, body) => {
        if(error) {reject(error)}
        resolve(response)
      })
    })
  }
}
