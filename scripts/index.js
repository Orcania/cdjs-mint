/* eslint-disable import/no-extraneous-dependencies */
// generate react template page
// Language: javascript
// Path: scripts\generate_template_page.js

const { program } = require('commander');

const actions = require('./actions');

program.name('template scripts').version('1.0.0').description('Set of scripts to bootstrap development');

program
    .command('gen-page')
    .description('Generate a page from template')
    .argument('<name>', 'name')
    // .option('-o, --output <folder>', 'Output folder')
    .action(actions.genPage);

// program
//     .command('gen-component')
//     .description('Generate a component from template')
//     .argument('<name>', 'name')
//     .action(actions.genComponentTemplate);

program.parse(process.argv);
