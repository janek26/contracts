/* External Imports */
import * as fs from 'fs'
import * as path from 'path'

import * as mkdirp from 'mkdirp'

import { RollupDeployConfig } from '../src/contract-deployment'
/* Internal Imports */
import { makeStateDump } from '../src/contract-dumps'

const { CHAIN_ID = '420' } = process.env || {}

;(async () => {
  const outdir = path.resolve(__dirname, '../build/dumps')
  const outfile = path.join(outdir, 'state-dump.latest.json')
  mkdirp.sync(outdir)

  const config = {
    ovmGlobalContext: {
      ovmCHAINID: parseInt(CHAIN_ID, 10),
    },
  }

  const dump = await makeStateDump(config as RollupDeployConfig)
  fs.writeFileSync(outfile, JSON.stringify(dump, null, 4))
})()
