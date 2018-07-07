import * as React from 'react'
import CreateQR from '../../core/CreateQR'
import { getEthereumAddress } from '../../crypto/Ethereum'
import  Table  from '../primitive/Table'
import { sendTransaction } from '../../core/SendTransaction'
import { ETHEREUM_PATH } from '../../core/paths'
import CurrencyCard from '../primitive/CurrencyCard'
import TransactionSend from '../primitive/TransactionSend'
import CurrencyAddress from '../primitive/CurrencyAddress'


interface IETHWindowState {
  address: string,
  qrcodeAddress: string,
  paymentAddress: string,
  amount: number,
  fee: number
}

export default class ETHWIndow extends React.Component<any, IETHWindowState> {
  constructor(props: any) {
    super(props)

    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleFeeChange = this.handleFeeChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      address: getEthereumAddress(),
      qrcodeAddress: '',
      paymentAddress: '',
      amount: 0,
      fee: 0
    }
  }
  componentWillMount() {
    this.setState({ qrcodeAddress: CreateQR(this.state.address) })
  }
  handleCopyClick() {
    // clipboard.writeText(this.state.address)
  }
  handleClick() {
    sendTransaction('ethereum', this.state.paymentAddress, this.state.amount.toString(), this.state.fee, this.props.redirect)
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
                  <CurrencyCard hourChange = {this.props.hourChange} balance = {this.props.balance} price = {this.props.price} name = 'ETH' fullName = 'Ethereum'/>
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
