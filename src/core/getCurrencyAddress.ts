import { getBitcoinAddress } from '../crypto/Bitcoin'
import { getEthereumAddress } from '../crypto/Ethereum'
import { getLitecoinAddress } from '../crypto/Litecoin'
import { getRippleAddress } from '../crypto/Ripple'

export default function getCurrencyAddress(currencyName: string): string {
    switch(currencyName) {
        case 'BTC': return getBitcoinAddress()
        case 'ETH': return getEthereumAddress()
        case 'LTC': return getLitecoinAddress()
        case 'XRP': return getRippleAddress()       
    }
}
