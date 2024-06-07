// SPDX-License-Indentifier: UNLICENSED
pragma solidity ^0.8.13;

contract ProfileStatus {
    struct Status {
        string statusMessage;
        bool exists;
    }

    mapping(address => Status) public userStatus;

    event StatusCreated(address indexed wallet, string status);
    event StatusUpdated(address indexed wallet, string newStatus);

    function createStatus(string memory initialStatus) public {
        require(!userStatus[msg.sender].exists , "Status already exist");
        userStatus[msg.sender] = Status ({
            statusMessage: initialStatus,
            exists: true
        });

        emit StatusCreated(msg.sender, initialStatus);
    }

    function updateStatus(string memory newStatus) public {
        require(userStatus[msg.sender].exists, "Status does not");
    }
}