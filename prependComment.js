const { readFileSync, writeFileSync } = require('fs')
const compiledJS = readFileSync('./dist/html.js', 'utf8')
writeFileSync(
  './dist/html.js',
  `/*!
 * Html-Builder JavaScript Library v${require('./package.json').version || '1.0.0'}
 * https://github.com/Mubarrat/html-builder/
 * 
 * Released under the MIT license
 * https://github.com/Mubarrat/html-builder/blob/main/LICENSE
 */
${compiledJS}`,
  'utf8'
)
