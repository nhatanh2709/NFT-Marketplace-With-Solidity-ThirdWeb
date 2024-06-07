//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    string public message ;

    constructor() {
        message = "Hello";
    }

    function getMessage () public view returns (string memory) {
        return message;
    }
}
