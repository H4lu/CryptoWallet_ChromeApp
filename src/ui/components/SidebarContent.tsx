import * as React from 'react'
// import {Link} from 'react-router-dom'
import { REFRESH_BUTTON_PATH, BTN_MENU_PATH } from '../../core/paths'

export  default class SidebarContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.handleUpdateDataClick = this.handleUpdateDataClick.bind(this)
  }
  handleUpdateDataClick() {
    this.props.refresh()
  }
  render() {
    return (
      <div className = 'sidebar'>
        <div className = 'sidebar-content'>
        <div className = 'sidebar-buttons'>
          <button type = 'submit' className = 'button-refresh' onClick = {this.handleUpdateDataClick}><img src = {REFRESH_BUTTON_PATH}/>Update Data</button>
          <button className = 'button-menu'><img src = {BTN_MENU_PATH}/></button>
        </div>
        <hr/>
        <div>
          <p className = 'total-label text-inline'>Total</p>
          {(this.props.totalPercent > 0) ? (
          <p className = 'total-percent text-inline'>{this.props.totalPercent}%</p>) : (
          <p className = 'total-percent text-inline negative-percentage'>{this.props.totalPercent}%</p>)}
        </div>
          <p className = 'total-currency-font'>{this.props.total}$</p>
          <hr/>
        <div className = 'nav-buttons-container'>
          <button className = 'nav-buttons'>Your addresses</button>
          <button className = 'nav-buttons'>ERC20</button>
          <button className = 'nav-buttons'>ShapeShift</button>
        </div>
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
