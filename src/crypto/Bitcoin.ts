import { TransactionBuilder } from 'bitcoinjs-lib'

export function buildTx() {
    let txb = new TransactionBuilder()

    txb.setVersion(1)
    txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0) // Alice's previous transaction output, has 15000 satoshis
    txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000)
    console.log('UNBUILDED', txb.buildIncomplete().toHex())
}