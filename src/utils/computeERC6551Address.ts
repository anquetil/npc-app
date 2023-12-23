import { concat, encodeAbiParameters, getContractAddress, pad } from "viem"

export function computeAccount(
   tokenContract: string,
   tokenId: string,
   chainId: number,
   implementationAddress: `0x${string}`,
   registryAddress: `0x${string}`,
   salt?: number
): `0x${string}` {
   salt = salt ?? 0
   const implementation = implementationAddress
   const erc6551registry = registryAddress

   const code = getCreationCode(
      implementation,
      chainId,
      tokenContract,
      tokenId,
      salt.toString()
   )

   const bigIntSalt = BigInt(salt).toString(16) as `0x${string}`
   const saltHex = pad(bigIntSalt, { size: 32 })

   return getContractAddress({
      bytecode: code,
      from: erc6551registry,
      opcode: 'CREATE2',
      salt: saltHex,
   })
}

function getCreationCode(
   implementation_: `0x${string}`,
   chainId_: number,
   tokenContract_: string,
   tokenId_: string,
   salt_: string
): Uint8Array {
   const types = [
      { type: 'uint256' },
      { type: 'uint256' },
      { type: 'address' },
      { type: 'uint256' },
   ]
   const values: (string | bigint)[] = [salt_, BigInt(chainId_), tokenContract_, tokenId_]
   const encodedABI = encodeAbiParameters(types, values)
   const hexImplementation = implementation_ as `0x${string}`

   const hexCreationCode = concat([
      '0x3d60ad80600a3d3981f3363d3d373d3d3d363d73',
      hexImplementation,
      '0x5af43d82803e903d91602b57fd5bf3',
      encodedABI,
   ])

   // Remove '0x' prefix
   const cleanAddress = hexCreationCode.slice(2)

   // Convert hex string to Uint8Array
   const array = new Uint8Array(cleanAddress.length / 2)

   for (let i = 0; i < cleanAddress.length; i += 2) {
      array[i / 2] = parseInt(cleanAddress.substring(i, i + 2), 16)
   }

   return array
}