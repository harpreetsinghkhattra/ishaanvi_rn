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
        // server: "https://thawing-citadel-16848.herokuapp.com/",
        // baseUrl: "https://thawing-citadel-16848.herokuapp.com/api/",
        // server: "http://13.127.188.164:3000/",
        // baseUrl: "http://13.127.188.164:3000/api/",
        server: "http://13.127.214.32:3000/",
        baseUrl: "http://13.127.214.32:3000/api/",
        locationBaseUrl: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        locationDetailBaseUrl: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        locationDetailViaZipCode: "https://maps.googleapis.com/maps/api/geocode/json"
    },

    keys:{
        googleLocation: "AIzaSyC3p6fQ5ebHm1IUq71tA8czm6Cqvr0hzpY"
    },

    keystore: { 
        name: APP_NAME.toLowerCase(),
        pemCertificatePath: 'rsa-example.pem',
        keyName: APP_NAME.toLowerCase(),
        publicKeyAlgorithm: 'rsa'
    }
}


// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Naggal&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyC3p6fQ5ebHm1IUq71tA8czm6Cqvr0hzpY
// https://maps.googleapis.com/maps/api/geocode/json?latlng=30.68042849999999,76.6181655&key=AIzaSyC3p6fQ5ebHm1IUq71tA8czm6Cqvr0hzpY