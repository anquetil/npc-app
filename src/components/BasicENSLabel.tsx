import { Address } from "viem";
import { useEnsName } from "wagmi";

function shortenHex(hex: string | undefined) {
   return hex === undefined ? '' : hex.slice(0, 8) + '...'
}

export default function BasicENSLabel({address}: {address: Address}){
   const {data} = useEnsName({address: address});
   const display = data ?? shortenHex(address);
   return(
      <div>{display}</div>
   )
}