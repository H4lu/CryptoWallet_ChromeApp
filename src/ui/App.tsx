import * as React from 'react'
import Red from './Red'
import { Redirect, Route } from 'react-router';
import CCid from '../hardware/CCID'
import Main from './Main'

interface IAppState {
    redirect: boolean
}

export default class App extends React.Component<any, IAppState> {
    CCID: CCid
    constructor(props: any) {
        super(props)
        this.CCID = new CCid()
        this.state = {
            redirect: false
        }
        this.getPermissions = this.getPermissions.bind(this)
    }
    getPermissions() {
        this.CCID.findDevice()
    }
    componentDidMount() {
        setTimeout(() => {
            this.getPermissions()
        }, 300,[])
    }
    render() {
        return(
            <div>
                
                {(this.state.redirect) ? (
                    <Redirect to ='/home'/>
                ): null} 
                <Route path = '/home' component = {() => <Red/>}/>
                <Route exact path = '/' component = {() => <Main permissions = {this.getPermissions}/>}/>
            </div>
        )
    }
}
