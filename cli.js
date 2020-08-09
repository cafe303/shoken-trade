#! /usr/bin/env node

const { program } = require('commander');
const Shoken = require('./src/Shoken')

let run = async () => {
  await Shoken.setup()
  await Shoken.start()
  if(!program.not_end){
    await Shoken.end()
  }
}
run()