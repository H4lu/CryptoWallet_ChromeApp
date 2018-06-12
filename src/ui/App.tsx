import * as React from 'react'
import { Redirect, Route } from 'react-router';
import CCid from '../hardware/CCID'
import MainWindow from './components/MainWindow'
import Header from './components/Header'
import Footer  from './components/Footer';
import { buildTx, getBitcoinSmartBitBalance } from '../crypto/Bitcoin'
import { getETBALANCE } from '../crypto/Ethereum'
import SidebarNoButtons from './components/SidebarNoButtons'
import SidebarContent from './components/SidebarContent'
import MainContent from './components/MainContent'
import LTCWindow from './components/LTCWindow'
import BTCWindow from './components/BTCWindow'
import ETHWIndow from './components/ETHWindow'


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
    routes = [
        {
          path: '/main',
          exact: true,
          sidebar: () => <SidebarContent total = {this.state.totalBalance} refresh = {this.updateData} totalPercent = {this.state.totalPercentage}/>,
          main: () => <MainContent btcBalance = {this.state.BTCBalance} ltcBalance = {this.state.LTCBalance} ethBalance = {this.state.ETHBalance}
          btcPrice = {this.state.BTCPrice} ltcPrice = {this.state.LTCPrice} ethPrice = {this.state.ETHPrice} btcHourChange = {this.state.BTCHourChange}
          ltcHourChange = {this.state.LTCHourChange} ethHourChange = {this.state.ETHHourChange} lastTx = {this.state.BTCLastTx.concat(this.state.ETHLastTx, this.state.LTCLastTx).sort((a: any, b: any) => {
            let c = new Date(a.Date).getTime()
            let d = new Date(b.Date).getTime()
            return d - c
          })} transactions = {this.getTransactions}/>
        },
        {
          path: '/btc-window',
          exact: true,
          sidebar: () => <SidebarNoButtons total = {this.state.totalBalance} totalPercent = {this.state.totalPercentage}/>,
          main: () => <BTCWindow balance = {this.state.BTCBalance} price = {this.state.BTCPrice} hourChange = {this.state.BTCHourChange} lastTx = {this.state.BTCLastTx.sort((a: any, b: any) => {
            let c = new Date(a.Date).getTime()
            let d = new Date(b.Date).getTime()
            return d - c
          })} transactions = {this.getTransactions} redirect = {this.redirectToTransactionsuccess} reset = {this.resetRedirect}/>
        },
        {
          path: '/eth-window',
          exact: true,
          sidebar: () => <SidebarNoButtons total = {this.state.totalBalance} totalPercent = {this.state.totalPercentage}/>,
          main: () => <ETHWIndow balance = {this.state.ETHBalance} price = {this.state.ETHPrice} hourChange = {this.state.ETHHourChange} lastTx = {this.state.ETHLastTx.sort((a: any, b: any) => {
            let c = new Date(a.Date).getTime()
            let d = new Date(b.Date).getTime()
            return d - c
          })} redirect = {this.redirectToTransactionsuccess} reset = {this.resetRedirect}/>
        },
        {
          path: '/ltc-window',
          exact: true,
          sidebar: () => <SidebarNoButtons total = {this.state.totalBalance} totalPercent = {this.state.totalPercentage}/>,
          main: () => <LTCWindow balance = {this.state.LTCBalance} price = {this.state.LTCPrice} hourChange = {this.state.LTCHourChange} lastTx = {this.state.LTCLastTx.sort((a: any, b: any) => {
            let c = new Date(a.Date).getTime()
            let d = new Date(b.Date).getTime()
            return d - c
          })} transactions = {this.getTransactions} redirect = {this.redirectToTransactionsuccess} reset = {this.resetRedirect}/>
        }
      ]
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
        this.getTransactions = this.getTransactions.bind(this)
        this.redirectToTransactionsuccess = this.redirectToTransactionsuccess.bind(this)
        this.resetRedirect = this.resetRedirect.bind(this)
        this.updateData = this.updateData.bind(this)
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
            this.setState({ redirectToMain: true })
        }, 300,[])
    }
    getTransactions() {

    }
    updateData() {

    }
    redirectToTransactionsuccess() {

    }
    resetRedirect() {

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
                {this.routes.map((route, index) => (
                <Route
                    exact = {route.exact}
                    key = {index}
                    path={route.path}
                    component= {route.sidebar}
                />
                ))}
                {this.routes.map((route, index) => (
                <Route
                    key = {index}
                    exact = {route.exact}
                    path={route.path}
                    component= {route.main}
                />
                ))}
                <Route path = '/start' component = {() => <MainWindow walletStatus = {this.state.walletStatus} connection = {this.state.connection} redirectToMain = {this.state.redirectToMain}/>}/>
                <Footer/>
            </div>
        )
    }
}
