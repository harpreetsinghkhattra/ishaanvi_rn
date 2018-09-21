import Palette from './Palette'
const NPM_PACKAGE = require('../package.json')
const APP_NAME = 'Ishaanvi'

/**
 * The configuration file for the App
 */
export default {

    // The full name of the application
    APP_NAME: APP_NAME,

    // First scene to show
    initialRouteFromConfig: false, // Must be true to use route below

    version: NPM_PACKAGE.version, // App version

    // React Native version
    rnVersion: NPM_PACKAGE.dependencies['react-native'].substring(1),

    // HTTP settings
    http: {
        server: "https://thawing-citadel-16848.herokuapp.com/",
        baseUrl: "https://thawing-citadel-16848.herokuapp.com/api/",
        locationBaseUrl: "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    },

    keys:{
        googleLocation: "AIzaSyBVx1pUqB-gI7wh0OJ8-unCZGGIdfee-Jk"
    },

    keystore: {
        name: APP_NAME.toLowerCase(),
        pemCertificatePath: 'rsa-example.pem',
        keyName: APP_NAME.toLowerCase(),
        publicKeyAlgorithm: 'rsa'
    }
}
