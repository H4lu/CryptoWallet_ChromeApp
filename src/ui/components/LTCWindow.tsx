import * as React from 'react'
import CreateQR from '../../core/CreateQR'
import { getLitecoinAddress } from '../../crypto/Litecoin'
import { sendTransaction } from '../../core/SendTransaction'
import  Table  from '../primitive/Table'
import { LITECOIN_PATH } from '../../core/paths'
import CurrencyAddress from '../primitive/CurrencyAddress'
import TransactionSend from '../primitive/TransactionSend'
import CurrencyCard from '../primitive/CurrencyCard'

interface ILTCWindowState {
  address: string,
  qrcodeAddress: string,
  paymentAddress: string,
  amount: number,
  fee: number
}

export default class LTCWindow extends React.Component<any, ILTCWindowState> {
  constructor(props: any) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleFeeChange = this.handleFeeChange.bind(this)

    this.state = {
      address: getLitecoinAddress(),
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
  handleClick() {
    sendTransaction('litecoin', this.state.paymentAddress, this.state.amount.toString(), this.state.fee, this.props.redirect)
  }
  handleCopyClick() {
    // clipboard.writeText(this.state.address)
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
    return (
      <div className = 'main'>
        <div className = 'main-content'>
          <div className = 'currency-content'>
            <div className = 'currency-block-container'>
              <div className = 'currency-block-card'>
                <p className = 'default-font-colored'>Your Bitcoin</p>
                <div className = 'card-container-second-block'>
                  <CurrencyCard hourChange = {this.props.hourChange} balance = {this.props.balance} price = {this.props.price} name = 'LTC' fullName = 'Litecoin'/>
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
