import { expect } from 'chai'
import { Contract, ContractFactory, constants } from 'ethers'
import { ethers } from 'hardhat'

import {
  DUMMY_OVM_TRANSACTIONS,
  NULL_BYTES32,
  hashTransaction,
  makeAddressManager,
} from '../../../helpers'

const DUMMY_HASH = hashTransaction(DUMMY_OVM_TRANSACTIONS[0])

describe('OVM_StateTransitionerFactory', () => {
  let AddressManager: Contract
  before(async () => {
    AddressManager = await makeAddressManager()
  })

  let Factory__OVM_StateTransitionerFactory: ContractFactory
  before(async () => {
    Factory__OVM_StateTransitionerFactory = await ethers.getContractFactory(
      'OVM_StateTransitionerFactory'
    )
  })

  let OVM_StateTransitionerFactory: Contract
  beforeEach(async () => {
    OVM_StateTransitionerFactory = await Factory__OVM_StateTransitionerFactory.deploy(
      AddressManager.address
    )
  })

  describe('create', () => {
    describe('when the sender is not the OVM_FraudVerifier', () => {
      before(async () => {
        await AddressManager.setAddress(
          'OVM_FraudVerifier',
          constants.AddressZero
        )
      })

      it('should revert', async () => {
        await expect(
          OVM_StateTransitionerFactory.create(
            AddressManager.address,
            NULL_BYTES32,
            NULL_BYTES32,
            DUMMY_HASH
          )
        ).to.be.revertedWith(
          'Create can only be done by the OVM_FraudVerifier.'
        )
      })
    })
  })
})
