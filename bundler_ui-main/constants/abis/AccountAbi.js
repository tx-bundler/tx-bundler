const AccountAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_txHash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_suggestedSignedHash",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "txType",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "to",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasPerPubdataByteLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPriorityFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymaster",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "reserved",
              "type": "uint256[4]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "bytes32[]",
              "name": "factoryDeps",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "paymasterInput",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "reservedDynamic",
              "type": "bytes"
            }
          ],
          "internalType": "struct Transaction",
          "name": "_transaction",
          "type": "tuple"
        }
      ],
      "name": "executeTransaction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "txType",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "to",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasPerPubdataByteLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPriorityFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymaster",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "reserved",
              "type": "uint256[4]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "bytes32[]",
              "name": "factoryDeps",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "paymasterInput",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "reservedDynamic",
              "type": "bytes"
            }
          ],
          "internalType": "struct Transaction",
          "name": "_transaction",
          "type": "tuple"
        }
      ],
      "name": "executeTransactionFromOutside",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "_signature",
          "type": "bytes"
        }
      ],
      "name": "isValidSignature",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "magic",
          "type": "bytes4"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "txType",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "to",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasPerPubdataByteLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPriorityFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymaster",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "reserved",
              "type": "uint256[4]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "bytes32[]",
              "name": "factoryDeps",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "paymasterInput",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "reservedDynamic",
              "type": "bytes"
            }
          ],
          "internalType": "struct Transaction[]",
          "name": "_transactions",
          "type": "tuple[]"
        }
      ],
      "name": "multicall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "txType",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "to",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasPerPubdataByteLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPriorityFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymaster",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "reserved",
              "type": "uint256[4]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "bytes32[]",
              "name": "factoryDeps",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "paymasterInput",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "reservedDynamic",
              "type": "bytes"
            }
          ],
          "internalType": "struct Transaction",
          "name": "_transaction",
          "type": "tuple"
        }
      ],
      "name": "payForTransaction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "txType",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "to",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasPerPubdataByteLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPriorityFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymaster",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "reserved",
              "type": "uint256[4]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "bytes32[]",
              "name": "factoryDeps",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "paymasterInput",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "reservedDynamic",
              "type": "bytes"
            }
          ],
          "internalType": "struct Transaction",
          "name": "_transaction",
          "type": "tuple"
        }
      ],
      "name": "prepareForPaymaster",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_suggestedSignedHash",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "txType",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "from",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "to",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "gasPerPubdataByteLimit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxPriorityFeePerGas",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymaster",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint256[4]",
              "name": "reserved",
              "type": "uint256[4]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            },
            {
              "internalType": "bytes32[]",
              "name": "factoryDeps",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "paymasterInput",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "reservedDynamic",
              "type": "bytes"
            }
          ],
          "internalType": "struct Transaction",
          "name": "_transaction",
          "type": "tuple"
        }
      ],
      "name": "validateTransaction",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "magic",
          "type": "bytes4"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

module.exports = {AccountAbi}