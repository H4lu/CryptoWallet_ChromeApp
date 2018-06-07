import * as React from 'react'

interface IMainProps {
    permissions: any
}

export default class Main extends React.Component<IMainProps, any> {
    constructor(props: any) {
        super(props)
       
    }
    render() {
        return(
            <div>
                <p>Zdraste!</p>
                <button onClick = {this.props.permissions}></button>
            </div>
        )
    }
}