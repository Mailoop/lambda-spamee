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
    const { body } = req
    const octokit = new Octokit({
        authStrategy: createAppAuth,
            auth: {
            appId: 69508,
            privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
            clientId: "Iv1.6337a70d7cb48b2d",
            clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
            installationId: 9889932,
        },
    });

    const { status, data } = await octokit.issues.update(body)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data ,
        status
    };

    } catch (e) {
      context.res = {
          // status: 200, /* Defaults to 200 */
        body: {
          ...e,
          secret: process.env.GITHUB_APP_CLIENT_SECRET,
          key: process.env.GITHUB_APP_PRIVATE_KEY
        },
          
          status: 500
      };
    }

}