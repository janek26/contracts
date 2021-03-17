// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.8.0;

/* Interface Imports */
import { iOVM_BondManager } from "../../iOVM/verification/iOVM_BondManager.sol";

/* Contract Imports */
import {
    Lib_AddressResolver
} from "../../libraries/resolver/Lib_AddressResolver.sol";

/**
 * @title mockOVM_BondManager
 */
contract mockOVM_BondManager is iOVM_BondManager, Lib_AddressResolver {
    constructor(address _libAddressManager)
        Lib_AddressResolver(_libAddressManager)
    {}

    function recordGasSpent(
        bytes32 _preStateRoot,
        bytes32 _txHash,
        address _who,
        uint256 _gasSpent
    ) public override {}

    function finalize(
        bytes32 _preStateRoot,
        address _publisher,
        uint256 _timestamp
    ) public override {}

    function deposit() public override {}

    function startWithdrawal() public override {}

    function finalizeWithdrawal() public override {}

    function claim(address _who) public override {}

    function isCollateralized(address _who)
        public
        view
        override
        returns (bool)
    {
        // Only authenticate sequencer to submit state root batches.
        return _who == resolve("OVM_Proposer");
    }

    function getGasSpent(
        bytes32, // _preStateRoot,
        address // _who
    ) public pure override returns (uint256) {
        return 0;
    }
}
