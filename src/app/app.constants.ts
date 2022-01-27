// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

//export const VERSION = process.env.VERSION;
import {environment} from "../environments/environment";

export const VERSION = '1.0.0';
//export const DEBUG_INFO_ENABLED = Boolean(process.env.DEBUG_INFO_ENABLED);
export const DEBUG_INFO_ENABLED = false;
// export const SERVER_API_URL = process.env.SERVER_API_URL ?? '';
// export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
//export const SERVER_API_URL = environment.SERVER_API_URL;
export const BUILD_TIMESTAMP = new Date();
