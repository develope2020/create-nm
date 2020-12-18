#! /usr/bin/env node
const { program } = require('commander')
const { version } = require('../package.json')
const fn = require('..')

const actionsMap = {
  'create': {
    alias: 'crt',
    desc: 'create a new project',
    examples: ['my-cli create <name>']
  },
  'config': {
    alias: 'cfg',
    desc: 'config a file',
    examples: [
      'my-cli config set <k> <v>',
      'my-cli config get <k>'
    ]
  }
}

Reflect.ownKeys(actionsMap).forEach(aName => {
  const opts = actionsMap[aName]
  program
    .command(aName)
    .alias(opts.alias)
    .description(opts.desc)
    .action(function (cmdObj) {
      fn(aName, cmdObj.args)
    })
})

// 自定义帮助信息
program.on('--help', function () {
  console.log('\nExamples:')
  Reflect.ownKeys(actionsMap).forEach(aName => {
    actionsMap[aName].examples.forEach(item => {
      console.log(`　${item}`)
    })
  })
})

program
  .name("my-cli")
  .description('my-cli tool')
  .version(version, '-v --vers')
  .parse(process.argv)