export function isTestNet() {
   return process.env.NEXT_PUBLIC_TESTNET
}

export function currentChainID() {
   return isTestNet() ? 11155111 : 8453
}
