import * as React from 'react'
import {ETHEREUM_PATH, RIPPLE_PATH, BITCOIN_PATH, LITECOIN_PATH} from '../../core/paths'
interface ICurrencyCardProps {
    name: string,
    shortName: string
}

export default class CurrencyCard extends React.Component<any, ICurrencyCardProps> {
    currencies = {'LTC': 'Litecoin', 'BTC': 'Bitcoin', 'ETH': 'Ethereum','XRP': 'Ripple'}
    path: string

    constructor(props: any) {
        super(props)

        this.getImagePath = this.getImagePath.bind(this)
    }
    componentWillMount() {
        this.getImagePath()
    }
    getImagePath() {
        switch(this.props.name) {
            case 'BTC': {
                this.path = BITCOIN_PATH
                break 
            }
            case 'ETH': {
                this.path = ETHEREUM_PATH
                break
            }
            case 'LTC': {
                this.path = LITECOIN_PATH
                break
            }
            case 'XRP': {
                this.path = RIPPLE_PATH
                break
            }
        }
    }
    render() {
        return(
            <div>
            <div className = 'card-upper-block'>
                <img src = {this.path}/>
                <p className = 'currency-name'> {this.currencies[this.props.name]}</p>
            </div>
            <hr/>
            <div className = 'card-bottom-block'>
                <div className = 'card-bottom-crypto-text'>
                    <p className = 'currency-amount-crypto text-inline'>{this.props.balance}</p><p className = 'currency-short-name text-inline'>{this.props.name}</p>
                </div>
                <div className = 'wrap'>
                    {(this.props.hourChange > 0) ? (
                    <p className = 'positive-percentage text-inline'>{this.props.hourChange}%</p>
                    ) : (
                    <p className = 'negative-percentage text-inline'>{this.props.hourChange}%</p>
                    )}
                    <p className = 'currency-amount-fiat text-inline'>{this.props.price}$</p>
                </div>
            </div>
            </div>
        )
    }
}
