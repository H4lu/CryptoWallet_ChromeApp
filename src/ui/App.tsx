import * as React from 'react'
import { Redirect, Route } from 'react-router';
import CCid from '../hardware/CCID'
import MainWindow from './components/MainWindow'
import Header from './components/Header'
import Footer  from './components/Footer';
import { buildTx, getBitcoinSmartBitBalance } from '../crypto/Bitcoin'
import { getETBALANCE } from '../crypto/Ethereum'

interface IAppState {
    BTCBalance: number,
    ETHBalance: number,
    LTCBalance: number,
    BTCPrice: number,
    ETHPrice: number,
    LTCPrice: number,
    totalBalance: number,
    BTCHourChange: number,
    ETHHourChange: number,
    LTCHourChange: number,
    BTCLastTx: Array<any>,
    LTCLastTx: Array<any>,
    ETHLastTx: Array<any>,
    connection: boolean,
    status: boolean,
    redirect: boolean,
    tempState: Array<any>,
    allowInit: boolean,
    redirectToTransactionSuccess: boolean,
    totalPercentage: number,
    isInitialized: boolean,
    walletStatus: number,
    redirectToMain: boolean
  }

export default class App extends React.Component<any, IAppState> {
    CCID: CCid
    constructor(props: any) {
        super(props)
        this.CCID = new CCid()
        this.state = {
            BTCBalance: 0,
            ETHBalance: 0,
            LTCBalance: 0,
            BTCPrice: 0,
            ETHPrice: 0,
            LTCPrice: 0,
            totalBalance: 0,
            BTCHourChange: 0,
            LTCHourChange: 0,
            ETHHourChange: 0,
            LTCLastTx: [],
            BTCLastTx: [],
            ETHLastTx: [],
            connection: false,
            status: false,
            redirect: false,
            tempState: [],
            allowInit: true,
            redirectToTransactionSuccess: false,
            totalPercentage: 0,
            isInitialized: false,
            walletStatus: 3,
            redirectToMain: false
          }
        this.getPermissions = this.getPermissions.bind(this)
    }

    getPermissions() {
        this.CCID.findDevice()
    }

    componentDidMount() {
        getBitcoinSmartBitBalance()
        getETBALANCE()
        buildTx()
        setTimeout(() => {
            this.getPermissions()
        }, 300,[])
    }

    componentWillMount() {
        this.setState({ redirect: true })
    }
    render() {
        return(
            <div className = 'container'>
                <Header/>
                {(this.state.redirect) ? (
                    <Redirect to = '/start'/>
                ): (
                     null
                )}
                <Route path = '/start' component = {() => <MainWindow walletStatus = {this.state.walletStatus} connection = {this.state.connection} redirectToMain = {this.state.redirectToMain}/>}/>
                <Footer/>
            </div>
        )
    }
}
