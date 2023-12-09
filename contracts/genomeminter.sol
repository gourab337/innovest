// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC20/extensions/ERC20FlashMint.sol";

contract GenomeMinter is ERC20, Ownable, ERC20FlashMint {
    constructor(address initialOwner)
        ERC20("Genome Research Token", "GTK")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
