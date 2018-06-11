import * as rpc from 'ethrpc'
declare global {
    interface Window {
        ethrpc: any
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
    let web3 = new window.Web3(new window.Web3.providers.HttpProvider('https://ropsten.infura.io/hgAaKEDG9sIpNHqt8UYM'))
    console.log('web3 object', web3)
   
    console.log(web3.eth.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd'))

}
