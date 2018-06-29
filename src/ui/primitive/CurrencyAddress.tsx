import * as React from 'react'

export class CurrencyAddress extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

    }

    render() {
        return(
            <div className = 'currency-address-container'>
              <div className = 'currency-address'>
                <p className = 'default-font-colored'>Your Ethereum Address:</p>
                <img src = {this.state.qrcodeAddress} className = 'address-qrcode'/>
                <div className = 'address-with-button'>
                    <p className = 'address-with-button-address'>{this.state.address}</p>
                    <button type = 'submit' className = 'button-copy' onClick = {this.props.handleCopyClick}>Copy</button>
                </div>
              </div>
            </div>
        )
    }
}
