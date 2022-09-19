const express = require('express')
const {RegistryClient} = require("@google-cloud/apigee-registry");
var cors = require('cors')
const path = require('path')

const metadata = require('gcp-metadata');
const {OAuth2Client, GoogleAuth} = require('google-auth-library');
const axios = require('axios').default;

const app = express();
const oAuth2Client = new OAuth2Client();
const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

async function audience() {
  if (!aud && (await metadata.isAvailable())) {
    let project_number = await metadata.project('numeric-project-id');
    let project_id = await metadata.project('project-id');

    aud = '/projects/' + project_number + '/apps/' + project_id;
  }

  return aud;
}

async function validateAssertion(assertion) {
  if (!assertion) {
    return {};
  }

  // Check that the assertion's audience matches ours
  const aud = await audience();

  // Fetch the current certificates and verify the signature on the assertion
  const response = await oAuth2Client.getIapPublicKeys();
  const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
    assertion,
    response.pubkeys,
    aud,
    ['https://cloud.google.com/iap']
  );
  const payload = ticket.getPayload();

  // Return the two relevant pieces of information
  return {
    email: payload.email,
    sub: payload.sub,
  };
}

app.use(cors())
app.use((req, res, next) => {
  res.locals.user = 'gkoli@google.com';
  next();
  // const assertion = req.header('X-Goog-IAP-JWT-Assertion');
  // let email = 'None';
  // try {
  //       const info = await validateAssertion(assertion);
  //       res.locals.user = info.email;
  //       next();
  //
  // } catch (error) {
  //   res.status(401);
  //   res.end();
  // }
});

app.use("/", express.static("dist/credential-provisioner"));

app.get("/registry-backend/organizations/:org/developer-apps",
  async (req, res) => {
    console.log("Hereee");
    if (res.locals.user) {
      url = `https://apigee.googleapis.com/v1/organizations/${req.params.org}/developers/${res.locals.user}/apps?expand=true`;
      const applicationDefaultClient = await auth.getClient();
      response = await applicationDefaultClient.request({url})
      response.data.app.forEach(app => {
        let attributes = app.attributes;
        app.attributes = {};
        attributes.forEach(obj => {
          if (obj.name == 'DisplayName') {
            app.displayName = obj.value;
          } else if (obj.name == 'Notes') {
            app.notes = obj.value;
          } else {
            attributes.push(obj);
          }
        });

      })
      res.json(response.data.app);
      console.log(JSON.stringify(response.data.app));
      res.end();
    } else {
      res.status(500);
      res.end();
    }
  })
app.get(
  "/registry-backend/projects/:project/locations/:location/apis/:api/deployments/:deployment",
  (req, res) => {

    var registryClient = new RegistryClient({
      // credentials: {id_token: req.header("authorization")}
    });

    registryClient.getApiDeployment({
      name: `projects/${req.params.project}/locations/${req.params.location}/apis/${req.params.api}/deployments/${req.params.deployment}`
    }, (err, deploymentObj) => {
      console.log(deploymentObj);
      if (!err) {
        res.json(deploymentObj);
      } else {
        console.log(err);
      }
      res.end();
    });
  });

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../dist/credential-provisioner/index.html'),
  )
})
app.listen(process.env.PORT || 80, function (err) {
  if (err) {
    console.log("Error in server setup")
  }
  console.log("Server listening on Port", process.env.PORT || 80);
});
