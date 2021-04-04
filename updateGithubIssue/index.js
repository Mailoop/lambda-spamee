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
    const { body } = req
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

    const { status, data } = await octokit.issues.update(body)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data ,
        status
    };

  } catch (e) {
      const privateKey = Buffer.from(process.env.BASE64_GITHUB_APP_PRIVATE_KEY, 'base64').toString('utf8')
      context.res = {
          // status: 200, /* Defaults to 200 */
        body: {
          ...e,
          secret: process.env.GITHUB_APP_CLIENT_SECRET,
          key: process.env.GITHUB_APP_PRIVATE_KEY,
          bkey: privateKey
        },
          status: 500
      };
    }

}