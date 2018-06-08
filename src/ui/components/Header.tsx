import * as React from 'react'
declare global {
  interface Window {
    hide : any
  }
}
export default class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

  }
  hideWindow() {
    window.hide()
  }
  closeWindow() {
    window.close()
  }
  render() {
    return (
      <div className = 'header'>
      <div className = 'header-content'>
        <div className = 'title-bar-buttons'>
          <button className = 'button-hide' onClick = {this.hideWindow}/>
          <button className = 'button-close' onClick = {this.closeWindow}/>
        </div>
      </div>
    </div>
    )
  }
}
