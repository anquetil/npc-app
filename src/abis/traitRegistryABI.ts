export const traitRegistry = [
   {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
   },
   {
      anonymous: false,
      inputs: [
         {
            indexed: false,
            internalType: 'uint256',
            name: 'traitId',
            type: 'uint256',
         },
      ],
      name: 'TraitRegistered',
      type: 'event',
   },
   {
      inputs: [
         {
            internalType: 'uint256',
            name: 'traitId',
            type: 'uint256',
         },
      ],
      name: 'ext_getImageDataForTrait',
      outputs: [
         {
            internalType: 'bytes',
            name: '',
            type: 'bytes',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'bytes',
            name: 'rleBytes',
            type: 'bytes',
         },
         {
            internalType: 'string',
            name: 'name',
            type: 'string',
         },
      ],
      name: 'ext_registerTrait',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getAllSelectors',
      outputs: [
         {
            internalType: 'bytes4[]',
            name: 'selectors',
            type: 'bytes4[]',
         },
      ],
      stateMutability: 'pure',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getAllSignatures',
      outputs: [
         {
            internalType: 'string[]',
            name: 'signatures',
            type: 'string[]',
         },
      ],
      stateMutability: 'pure',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'bytes4',
            name: 'selector',
            type: 'bytes4',
         },
      ],
      name: 'signatureOf',
      outputs: [
         {
            internalType: 'string',
            name: '',
            type: 'string',
         },
      ],
      stateMutability: 'pure',
      type: 'function',
   },
] as const
