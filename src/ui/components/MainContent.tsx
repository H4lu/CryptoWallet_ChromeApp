import * as React from 'react'
import { Link } from 'react-router-dom'
import  Table  from '../primitive/Table'
import { ETHEREUM_PATH, BITCOIN_PATH, LITECOIN_PATH, RIPPLE_PATH } from '../../core/paths'

export default class MainContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.refresh()
  }

  render () {
    return (
    <div className = 'main'>
      <div className = 'main-content'>
          <div className = 'currency-block'>
            <header className = 'currencies-header'>Cryptocurrency: </header>
          <section className = 'currencies-container'>
            <Link to = '/btc-window' className = 'card-container'>
              <div className = 'card-upper-block'>
                <img src = {BITCOIN_PATH}/>
                <p className = 'currency-name'> Bitcoin</p>
              </div>
              <hr/>
              <div className = 'card-bottom-block'>
              <div className = 'card-bottom-crypto-text'>
                   <p className = 'currency-amount-crypto text-inline'> {this.props.btcBalance}</p><p className = 'currency-short-name text-inline'>BTC</p>
                  </div>
                  <div className = 'wrap'>
                    {(this.props.btcHourChange > 0) ? (
                      <p className = 'positive-percentage text-inline'>{this.props.btcHourChange}%</p>
                    ) : (
                      <p className = 'negative-percentage text-inline'>{this.props.btcHourChange}%</p>
                    )}
                   <p className = 'currency-amount-fiat text-inline'>{this.props.btcPrice}$</p>
                   </div>
              </div>
            </Link>
            <Link to = '/eth-window' className = 'card-container'>
              <div className = 'card-upper-block'>
                <img src = {ETHEREUM_PATH}/>
                <p className = 'currency-name'>Ethereum</p>
              </div>
              <hr/>
              <div className = 'card-bottom-block'>
                <div className = 'card-bottom-crypto-text'>
                  <p className = 'currency-amount-crypto text-inline'> {this.props.ethBalance}</p><p className = 'currency-short-name text-inline'>ETH </p>
                </div>
                <div className = 'wrap'>
                  {(this.props.ethHourChange > 0) ? (
                    <p className = 'positive-percentage text-inline'>{this.props.ethHourChange}%</p>
                  ) : (
                    <p className = 'negative-percentage text-inline'>{this.props.ethHourChange}%</p>
                  )}
                  <p className = 'currency-amount-fiat text-inline'>{this .props.ethPrice}$</p>
                </div>
              </div>
            </Link>
            <Link to = '/ltc-window' className = 'card-container'>
              <div className = 'card-upper-block'>
                <img src = {LITECOIN_PATH}/>
                <p className = 'currency-name'>Litecoin</p>
              </div>
              <hr/>
              <div className = 'card-bottom-block'>
                <div className = 'card-bottom-crypto-text'>
                   <p className = 'currency-amount-crypto text-inline'> {this.props.ltcBalance}</p><p className = 'currency-short-name text-inline'>LTC </p>
                </div>
                <div className = 'wrap'>

                {(this.props.ltcHourChange > 0) ? (
                  <p className = 'positive-percentage text-inline'>{this.props.ltcHourChange}%</p>
                ) : (
                  <p className = 'negative-percentage text-inline'>{this.props.ltcHourChange}%</p>
                )}
                <p className = 'currency-amount-fiat'>{this.props.ltcPrice}$</p>
                </div>
                </div>
            </Link>
            <Link to = '/ripple-window' className = 'card-container'>
              <div className = 'card-upper-block'>
                <img src = {RIPPLE_PATH}/>
                <p className = 'currency-name'> Ripple</p>
              </div>
              <hr/>
              <div className = 'card-bottom-block'>
              <div className = 'card-bottom-crypto-text'>
                   <p className = 'currency-amount-crypto text-inline'> {this.props.btcBalance}</p><p className = 'currency-short-name text-inline'>XRP</p>
                  </div>
                  <div className = 'wrap'>
                    {(this.props.btcHourChange > 0) ? (
                      <p className = 'positive-percentage text-inline'>{this.props.btcHourChange}%</p>
                    ) : (
                      <p className = 'negative-percentage text-inline'>{this.props.btcHourChange}%</p>
                    )}
                   <p className = 'currency-amount-fiat text-inline'>{this.props.btcPrice}$</p>
                   </div>
              </div>
            </Link>
           </section>
           <hr/>
          </div>
         <Table data = {this.props.lastTx} type = 'normal'/>
        </div>
      </div>
    )
  }
}

