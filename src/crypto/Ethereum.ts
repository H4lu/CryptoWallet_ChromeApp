import * as rpc from 'ethrpc'
declare global {
    interface Window {
        ethrpc: any
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
    window.ethrpc.connect(connectionConfiguration, (err) => {
        if (err) {
            console.error('Failed to connect to Ethereum node')
        } else {
            console.log('Connected to Eth node!')
            window.ethrpc.eth.getBalance("0x619B30BE614ce453035058736cd2B83c34373Ddd",function(err,res) {
                console.log('error',err)
                console.log(res)
            },1)
        }
    })
    /* let web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/hgAaKEDG9sIpNHqt8UYM'))
    console.log('web3 object', web3)
   
    web3.eth.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd')
    */
}