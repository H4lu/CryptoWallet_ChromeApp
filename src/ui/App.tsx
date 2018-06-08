import * as React from 'react'
import Red from './Red'
import { Redirect, Route } from 'react-router';
import CCid from '../hardware/CCID'
import Main from './Main'
import MainWindow from './components/MainWindow'
import Header from './components/Header'
import Footer  from './components/Footer';
import { buildTx } from '../crypto/Bitcoin'
import { getETBALANCE } from '../crypto/Ethereum'
interface IAppState {
    redirectToMain: boolean,
    walletStatus: number,
    connection: boolean,
    redirect: boolean
}

export default class App extends React.Component<any, IAppState> {
    CCID: CCid
    constructor(props: any) {
        super(props)
        this.CCID = new CCid()
        this.state = {
            redirectToMain: false,
            walletStatus: 3,
            connection: false,
            redirect: false
        }
        this.getPermissions = this.getPermissions.bind(this)
    }

    getPermissions() {
        this.CCID.findDevice()
    }

    componentDidMount() {
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
                <Route exact path = '/' component = {() => <Main permissions = {this.getPermissions}/>}/>
                <Footer/>
            </div>
        )
    }
}
