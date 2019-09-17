import Amplify from "aws-amplify";

Amplify.configure({
    Auth: {
        identityPoolId: 'eu-west-1:4936b8f4-66cd-4175-84e5-7a983eb47180',
        region: 'eu-west-1',
        userPoolId: 'eu-west-1_3sxDScGLH',
        userPoolWebClientId: '4jgkebm1mh2v2r8vq05f4q21b3',
        mandatorySignIn: false,
        // authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})