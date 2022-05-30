// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiURL: "https://exercisediimo.herokuapp.com/api/v1/diimo",
  firebase: {
    projectId: 'exercisediimo',
    appId: '1:269981820707:web:2ab95c64687fa72fd9ce96',
    storageBucket: 'exercisediimo.appspot.com',
    apiKey: 'AIzaSyD4pbxx_Jcy1bEh6CfDS4cqZZDO5Iwf0nQ',
    authDomain: 'exercisediimo.firebaseapp.com',
    messagingSenderId: '269981820707',
    measurementId: 'G-H2N96JZ364',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
