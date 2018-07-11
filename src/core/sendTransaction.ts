import { handleBitcoin } from '../crypto/Bitcoin'
import { handleEthereum } from '../crypto/Ethereum'
import { handleLitecoin } from '../crypto/Litecoin'

export function sendTransaction(currency: string, paymentAddress: string, amount: string, fee: number, redirect: any) {
  if (amount.includes(',')) amount = amount.toString().replace(',','.')
  switch (currency) {
  case 'BTC':
    handleBitcoin(paymentAddress, Number(amount), fee, redirect)
    break
  case 'LTC':
    handleLitecoin(paymentAddress, Number(amount), fee,redirect)
    break
  case 'ETH':
    handleEthereum(paymentAddress, Number(amount), fee, 21000,redirect)
    break
  case 'XRP':
    break
  }
}
