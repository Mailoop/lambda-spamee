const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");

const owner = "Mailoop"
const repo = "app"

const asyncForEach = async (array, callback) =>  {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = async function (context, req) {
  try {

    const privateKey = Buffer.from(process.env.BASE64_GITHUB_APP_PRIVATE_KEY, 'base64').toString('utf8')
    const octokit = new Octokit({
        authStrategy: createAppAuth,
            auth: {
            appId: 69508,
            privateKey: privateKey,
            clientId: "Iv1.6337a70d7cb48b2d",
            clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
            installationId: 9889932,
        },
    });

    const { body: task } = req

    switch (task.status) {
      case 'Done':
        const githubBody = {
          owner: "Mailoop",
          repo: "app",
          issue_number: task.issue_number,
          state: "closed"
        }
        const { status, data } = await octokit.issues.update(githubBody)
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: data ,
            status
        };
      case "Engineering", "Implementation", "Tech Review", "Product review":
        
        if (task.issue_number !== "") {
          const githubBody = {
            owner: "Mailoop",
            repo: "app",
            title: task.Name
          }
          const { status, data } = await octokit.issues.create(githubBody)
          context.res = {
            // status: 200, /* Defaults to 200 */
            body: data,
            status
          };
        }
    }
      

  } catch (e) {
      context.res = {
          // status: 200, /* Defaults to 200 */
        body: {
          ...e,
        },
          status: 500
      };
    }

}