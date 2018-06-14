import * as React from 'react'
import { Link } from 'react-router-dom'

export default class SidebarNoButtons extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return(
      <div className = 'sidebar'>
        <div className = 'sidebar-content'>
          <div>
            <Link to = '/main'>
              <button type = 'submit' className = 'button-home'>Home</button>
            </Link>
          </div>
          <hr/>
          <div>
            <p className = 'total-label text-inline'>Total</p>
            {(this.props.totalPercent > 0) ? (<p className = 'total-percent text-inline'>{this.props.totalPercent}%</p>) : (<p className = 'total-percent text-inline negative-percentage'>{this.props.totalPercent}%</p>)}
          </div>
          <p className = 'total-currency-font'>{this.props.total}$</p>
          <hr/>
          <header className = 'info-header-font'>Your Braitberry:</header>
            <div className = 'about-block'>
            <div className = 'about-block-margin'>
             <p className = 'info-default-font '>-ID:</p><p className = 'info-amount-font '>13332</p>
            </div>
            <div className = 'about-block-margin'>
             <p className = 'info-default-font '>Currency Available</p><p className ='info-amount-font '>3</p>
            </div>
            <div className = 'about-block-margin'>
             <p className = 'info-default-font '>Currency Can Add</p><p className = 'info-amount-font'>2</p>
            </div>
            </div>
        </div>
      </div>
    )
  }
}
