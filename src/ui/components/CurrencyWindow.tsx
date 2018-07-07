import * as React from 'react'
import Table from '../primitive/Table'
import CurrencyCard from '../primitive/CurrencyCard'
import TransactionSend from '../primitive/TransactionSend'
import CurrencyAddress from '../primitive/CurrencyAddress'
import { sendTransaction } from '../../core/sendTransaction'
import getCurrencyAddress from '../../core/getCurrencyAddress'

interface ICurrencyWindowProps {
    name: string,
    hourChange: number,
    balance: number,
    price: number,
    lastTx: Array<any>,
    redirect: Function
}

interface ICurrencyWindowState {
    address: string,
    paymentAddress: string,
    paymentAmount: string,
    fee: number
}

export default class CurrencyWindow extends React.Component<ICurrencyWindowProps, ICurrencyWindowState> {
    currencies = {'LTC': 'Litecoin', 'BTC': 'Bitcoin', 'ETH': 'Ethereum','XRP': 'Ripple'}
    constructor(props: any) {
        super(props)

        this.handleCopyClick = this.handleCopyClick.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.handleFeeChange = this.handleFeeChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.state = {
            address: getCurrencyAddress(this.props.name),
            paymentAddress: '',
            paymentAmount: '',
            fee: 0
        }
    }
    handleCopyClick() {
 
    }
    handleClick() {
        sendTransaction(this.props.name, this.state.paymentAddress, this.state.paymentAmount, this.state.fee, this.props.redirect)
    }
    handleAddressChange(e: any) {
        this.setState({ address: e.target.value })
    }
    handleFeeChange(e: any) {
        this.setState({ fee: e.target.value })
    }
    handleAmountChange(e: any) {
        this.setState({ paymentAmount: e.target.value })
    }
    render() {
        return(
            <div className = 'main'>
                <div className = 'main-content'>
                    <div className = 'currency-content'>
                        <div className = 'currency-block-container'>
                            <div className = 'currency-block-card'>
                                <p className = 'default-font-colored'>Your {this.currencies[this.props.name]}</p>
                                <div className = 'card-container-second-block'>
                                    <CurrencyCard hourChange = {this.props.hourChange} balance = {this.props.balance} price = {this.props.price} name = {this.props.name} fullName = {this.currencies[this.props.name]}/>
                                </div>
                            </div>
                                <TransactionSend/>
                        </div>
                            <CurrencyAddress handleCopyClick = {this.handleCopyClick} address = {this.state.address} />
                    </div>
                        <Table data = {this.props.lastTx} type = 'small'/>
                </div>
            </div>
        )
    }
}
