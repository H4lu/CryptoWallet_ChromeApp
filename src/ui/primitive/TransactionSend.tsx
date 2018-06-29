import * as React from 'react'

interface ITransactionSendProps {
    name: string,
    handleClick: React.MouseEvent<HTMLButtonElement>
}

interface ITransactionSendState {
    paymentAddress: string,
    amount: string
}

export default class TransactionSend extends React.Component<any, ITransactionSendState> {
    constructor(props: any) {
        super(props)

        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)

        this.state = {
            paymentAddress: '',
            amount: ''
        }
    }
    handleAmountChange(e: any) {
        this.setState({ amount: e.target.value })
    }
    handleAddressChange(e: any) {
        this.setState({ paymentAddress: e.target.value })
    }
    render() {
        return(
            <div className = 'currency-block-transaction'>
            <header className = 'default-font-colored'>Send Bitcoin</header>
              <input type = 'text' className = 'payment_address' placeholder = 'Payment Address' value = {this.state.paymentAddress} onChange = {this.handleAddressChange}/>
              <input type = 'text' className = 'payment_address' placeholder = 'Amount' onChange = {this.handleAmountChange} value = {this.state.amount}/>
              <button type = 'submit' className = 'button-send' onClick = {this.props.handleClick}>Send</button>
            </div>
        )
    }
}