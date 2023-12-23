export function isTestNet() {
   return process.env.NEXT_PUBLIC_TESTNET == 'TRUE'
}

export function currentChainID() {
   return isTestNet() ? 5 : 8453
}
