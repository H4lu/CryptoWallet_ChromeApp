import * as rpc from 'ethrpc'
import * as ethers from 'ethers'
declare global {
    interface Window {
        ethers: any,
        Web3: any
    }
}

let connectionConfiguration = {
    httpAddresses: ['https://api.myetherapi.com/rop'],
    wsAddresses:[],
    ipcAddresses: [], // optional, default empty array
    errorHandler: function (err) { 
        console.log('ERROR OCCURED',err)
     }, // optional, used for errors that can't be correlated back to a request
  };

export function getETBALANCE() {
    // let web3 = new window.Web3(new window.Web3.providers.HttpProvider('https://ropsten.infura.io/hgAaKEDG9sIpNHqt8UYM'))
    // console.log('web3 object', web3)
    let eth = ethers
    console.log('ETH', eth)
    console.log('ETHERERER', ethers)
    console.log('ETHERS', (<any> window).ethers)
    console.log('Window', window,window.ethers,window['ethers'])
    let prov = new ethers.providers.InfuraProvider('ropsten','hgAaKEDG9sIpNHqt8UYM')
    console.log('PROV', prov)
    let provider = eth.providers.getDefaultProvider()
    console.log('DEFAULT PROVIDER', provider)
    prov.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd').then(value => {
        console.log('GOT THIS BALANCE',ethers.utils.formatEther(value))
    })
    // console.log(web3.eth.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd'))
}

export function handleEthereum(address: string, amount: number, fee: number, gasPrice: number, redirect: Function) {

}
export function getEthereumAddress(): string {
    return
}
export function initEthereumAddress(): Promise<any> {
    return

}
export function getEthereumLastTx() {

}
export function setETHBalance( balance: number ) {

}
export function getETHBalance(): Promise<any> {
    return
}
export function setETHPrice(price: number) {

}