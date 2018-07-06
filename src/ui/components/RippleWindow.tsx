import * as React from 'react'
import { RIPPLE_PATH } from '../../core/paths';
import CurrencyCard from '../primitive/CurrencyCard'
import TransactionSend from '../primitive/TransactionSend'
import CurrencyAddress from '../primitive/CurrencyAddress'
import Table from '../primitive/Table'

interface IRippleWindowState {
    address: string,
    qrcodeAddress: string,
    paymentAddress: string,
    amount: number,
    fee: number
}

export default class RippleWindow extends React.Component<any, IRippleWindowState> {
    constructor(props : any) {
        super(props)

        this.state = {
            address: '',
            qrcodeAddress: '',
            paymentAddress: '',
            amount: 0,
            fee: 0
        }
        this.handleCopyClick = this.handleCopyClick.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleFeeChange = this.handleFeeChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
    }
    componentWillMount() {
        this.setState({ qrcodeAddress: '' })
    }
    handleCopyClick() {

    }
    handleAddressChange(e: any) {
        this.setState({ paymentAddress: e.target.value })
    }
    handleAmountChange(e: any) {
        this.setState({ amount: e.target.value })
    }
    handleFeeChange(e: any) {
        this.setState({ fee: e.target.value })
    }
    handleClick() {

    }
    render() {
        return(
            <div className = 'main'>
                <div className = 'main-content'>
                    <div className = 'currency-content'>
                        <div className = 'currency-block-container'>
                            <div className = 'currency-block-card'>
                                <p className = 'default-font-colored'>Your Ripple</p>
                                <div className = 'card-container-second-block'>
                                    <CurrencyCard  hourChange = {this.props.hourChange} balance = {this.props.balance} price = {this.props.price} name = 'XRP' fullName = 'Ripple'/>
                                </div>
                            </div>
                                    <TransactionSend/>
                        </div>
                            <CurrencyAddress  handleCopyClick = {this.props.handleCopyClick} address = {this.state.address} qrCodeAddress = {this.state.qrcodeAddress}/>
                    </div>
                            <Table data = {this.props.lastTx} type = 'small'/>
                </div>
            </div>
        )
    }
}
