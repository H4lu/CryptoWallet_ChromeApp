declare global {
    interface Window {
        ripple: any
    }
}

let address = 'rB9AWyzAJQ7DwVTvLmAe5XjtUKExxogAkV'
const sourceNumber = 6
console.log('RIPPLE',window,Window)
const Ripple = new window.ripple.RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'})
let pubkey = '0223254fe57496571e79d92c69f3a9e928e5b2e045a237752166801336084f5b38'

export function getBalance() {
    return new Promise(async (resolve) => {
        console.log(window.ripple)
        let balance = await Ripple.getBalances(address)
        console.log('GOT THIS BALANCE', balance)
        console.log(JSON.stringify(balance,null,2))
        resolve(JSON.stringify(balance,null,2))
    })
}

export function connectToRipple() {
    return new Promise((resolve, reject) => {
        Ripple.connect().then(() => {
            console.log('CONNECTED TO RIPPLE')
            resolve()
        }).catch((err) => {
            console.log('Error during connection to Ripple', err)
            reject()
        })
    })
}
