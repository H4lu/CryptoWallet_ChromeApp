import * as React from 'react'
import CreateQR from '../../core/CreateQR'
import { getBitcoinAddress } from '../../crypto/Bitcoin' 
import  Table  from '../primitive/Table'
import { sendTransaction } from '../../core/SendTransaction'
import { BITCOIN_PATH } from '../../core/paths'
import CurrencyCard from '../primitive/CurrencyCard'
import TransactionSend from '../primitive/TransactionSend'
import CurrencyAddress from '../primitive/CurrencyAddress'

interface IBTCWindowState {
  address: string,
  qrcodeAddress: string,
  paymentAddress: string,
  amount: number,
  fee: number
}

export default class BTCWindow extends React.Component<any, IBTCWindowState> {
  constructor(props: any) {
    super(props)

    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleFeeChange = this.handleFeeChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      address: getBitcoinAddress(),
      qrcodeAddress: '',
      paymentAddress: '',
      amount: 0,
      fee: 0
    }
  }
  componentWillMount() {
    this.setState({ qrcodeAddress: CreateQR(this.state.address) })
    // this.props.transactions()
    console.log('PROPERTY: ' + this.props.lastTx)
  }
  handleCopyClick() {
    // clipboard.writeText(this.state.address)
  }
  handleClick() {
    sendTransaction('bitcoin', this.state.paymentAddress, this.state.amount, this.state.fee, this.props.redirect)
  }
  handleAmountChange(e: any) {
    this.setState({ amount: e.target.value })
  }
  handleAddressChange(e: any) {
    this.setState({ paymentAddress: e.target.value })
  }
  handleFeeChange(e: any) {
    this.setState({ fee: e.target.value })
  }
  render () {
    console.log('PROPS IN BTCWINDOW', this.props.balance)
    return (
      <div className = 'main'>
        <div className = 'main-content'>
          <div className = 'currency-content'>
            <div className = 'currency-block-container'>
              <div className = 'currency-block-card'>
                <p className = 'default-font-colored'>Your Bitcoin</p>
                <div className = 'card-container-second-block'>
                  <CurrencyCard hourChange = {this.props.hourChange} balance = {this.props.balance} price = {this.props.price} name = 'BTC' fullName = 'Bitcoin'/>
              </div>
              </div>
                  <TransactionSend/>
            </div>
                  <CurrencyAddress handleCopyClick = {this.props.handleCopyClick} address = {this.state.address} />
                  </div>
            <Table data = {this.props.lastTx} type = 'small'/>
          </div>
      </div>
    )
  }
}
