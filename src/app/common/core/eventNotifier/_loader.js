/* ////////// Dynamic File Loading in Webpack //////////
 *
 * This is allows entire module folders to be required.
 *
 * It ensures that files are loaded in the correct order:
 *   - For dynamic requires to work properly with Angular (and the ngtemplate loader) html
 *     must be loaded first, followed by script files.
 *   - Script files must be loaded in a precise order; module declartions (xxxxx.module.js)
 *     first followed by all others, and ommiting test spec files (xxxxx.spec.js)
 *
 */

/*
 * Require and load module's HTML templates
 *
 * These must come before the javascript module due to how ngtemplate-loader works with dynamic requires
 *
 */
let moduleTemplates = require.context('./', true, /\.html$/);

moduleTemplates.keys().forEach((key) => {
  moduleTemplates(key);
});

/*
 * Require and load module declaration files
 *
 * These are files names as follows xxxxx.module.js (but not module.js)
 *
 */
let moduleFile = require.context('./', true, /\.module\.js/i);

moduleFile.keys().forEach((key) => {
  moduleFile(key);
});

/*
 * Require and load other module scripts
 *
 * These are files that are not module declarations (xxxxx.module.js), test specs (xxxxx.spec.js),
 * or this actual loader file (_loader.js)
 *
 */
let moduleScripts = require.context('./', true, /^(?!.+\.module|.+\.spec|.+\_loader).+\.js/i);

moduleScripts.keys().forEach((key) => {
  moduleScripts(key);
});

// console.log('----- loading module -----');
// console.log('tmpl:', moduleTemplates.keys());
// console.log('modules:', moduleFile.keys());
// console.log('scripts:', moduleScripts.keys());
// console.log('----- done -----');
