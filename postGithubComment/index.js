const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");
const eol = require('eol')

const owner = "Mailoop"
const repo = "app"

module.exports = async function (context, req) {

    const { body: {issue_number, body}} = req
    const octokit = new Octokit({
        authStrategy: createAppAuth,
            auth: {
            appId: 69508,
            privateKey: process.env.GITHUB_APP_PRIVATE_KEY.replace(/\\r\\n/g, '\r\n'),
            clientId: "Iv1.6337a70d7cb48b2d",
            clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
            installationId: 9889932,
        },
    });

    const { status, data } = await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body,
    })

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data ,
        status
    };

}