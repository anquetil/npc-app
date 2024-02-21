export const tempEquipABI = [
   {
      inputs: [
         {
            internalType: 'addresss',
            name: 'owner',
            type: 'address',
         },
         {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
         },
         {
            internalType: 'uint256',
            name: 'preceedingTokenId',
            type: 'uint256',
         },
      ],
      name: 'ext_addTokenId',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
   {
      constant: false,
      inputs: [
         {
            internalType: 'address',
            name: 'owner',
            type: 'address',
         },
         {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
         },
      ],
      name: 'ext_removeTokenId',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
] as const
