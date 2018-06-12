import * as  React from 'react'
import { Redirect } from 'react-router';
import { LOGO_PATH } from '../../core/paths'

interface IMainWindowState {
    redirect: boolean
}

interface IMainWindowProps {
    walletStatus: number,
    redirectToMain: boolean,
    connection: boolean
}

export default class MainWindow extends React.Component<IMainWindowProps, IMainWindowState> {
    constructor(props: any) {
        super(props)
        this.state = {
            redirect: false
        }
    }
    renderWalletState() {
        switch (this.props.walletStatus) {
            case 0: {
                return <p className = 'window-main-ready'>Your Crypto Wallet is ready for use</p>
              }
              case 1: {
                return <p className = 'window-main-not-ready'>Don`t contain SIM</p>
              }
              case 2: {
                return <p className = 'window-main-not-ready'>Waiting for PIN</p>
              }
              case 3: {
                return <p className = 'window-main-not-ready'>Not initialized</p>
              }
              case 4: {
                return <p className = 'window-main-not-ready'>SIM blocked</p>
              }
        }
    }
    render() {
        if (this.props.redirectToMain) {
          return <Redirect from = '/' to = '/main'/>
        }
    
        // <img src = '../static/logo.svg'/>

        return(
            <div className = 'window-main'>
                <div className = 'main-window-flex-container'>
                    <p className = 'window-main-header'>Your Safest Wallet</p>
                    <img src = {LOGO_PATH} className = 'logo'/>
                    {(this.props.connection) ? (
                        this.renderWalletState()
                    ) : (
                        <p className = 'window-main-not-ready'>USB-cable is not connected</p>
                    )}
                </div>
          </div>
        )
    }
}
