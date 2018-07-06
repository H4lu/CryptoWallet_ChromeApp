import * as React from 'react'
import * as QrCode from 'qrcode.react'

export default class CurrencyAddress extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

    }

    render() {
        return(
            <div className = 'currency-address-container'>
              <div className = 'currency-address'>
                <p className = 'default-font-colored'>Your {this.props.fullName} Address:</p>
                <QrCode value = {this.props.address} className = 'address-qrcode' size = '110'/>
                <div className = 'address-with-button'>
                    <p className = 'address-with-button-address'>{this.props.address}</p>
                    <button type = 'submit' className = 'button-copy' onClick = {this.props.handleCopyClick}>Copy</button>
                </div>
              </div>
            </div>
        )
    }
}
