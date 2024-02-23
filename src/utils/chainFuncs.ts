export function isTestNet() {
   return process.env.NEXT_PUBLIC_TESTNET || true // default to testnet
}

export function currentChainID() {
   return isTestNet() ? 11155111 : 8453
}
