import * as React from 'react'
import * as CCID from '../../hardware/CCID'

export default class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.hideWindow = this.hideWindow.bind(this)
    this.closeWindow = this.closeWindow.bind(this)
    this.fullscreenWindow = this.fullscreenWindow.bind(this)
  }
  hideWindow() {
    chrome.app.window.current().hide()
  }
  closeWindow() {
    CCID.closeDevice()
    chrome.app.window.current().close()
  }
  fullscreenWindow() {
    if (chrome.app.window.current().isFullscreen()) {
      chrome.app.window.current().restore()
    } else {
      chrome.app.window.current().fullscreen()
    }
    
  }
  render() {
    return (
      <div className = 'header'>
      <div className = 'header-content'>
        <div className = 'title-bar-buttons'>
          <button className = 'button-hide' onClick = {this.hideWindow}/>
          <button className = 'button-fullscreen' onClick = {this.fullscreenWindow}/>
          <button className = 'button-close' onClick = {this.closeWindow}/>
        </div>
      </div>
    </div>
    )
  }
}
