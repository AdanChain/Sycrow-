import { providers } from "ethers"
import { useEffect, useMemo } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { Config, useConnectorClient } from 'wagmi'
import { config } from "../config"

const taget_ChainId = config.CHAIN_ID
export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider: any = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)

  if (chain.id !== taget_ChainId) {
    switchNetwork(taget_ChainId)
  }
  return signer
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })

  useEffect(() => {
    if (client) {
      clientToSigner(client)
    }
  }, [client])

  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}

async function switchNetwork(taget_ChainId: number) {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${taget_ChainId.toString(16)}` }],
      })
    } catch (error: any) {
      console.log(error);
      // if (error.code === 4902) {
      //   await window.ethereum.request({
      //     method: 'wallet_addEthereumChain',
      //     params: [{
      //       chainId: `0x${taget_ChainId.toString(16)}`,
      //       chainName: 'holesky',
      //       nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      //       rpcUrls: ['https://holesky.drpc.org'],
      //       blockExplorerUrls: ['https://holesky.etherscan.io'],
      //     }]
      //   })
      // }
    }
  }
}