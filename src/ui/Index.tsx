import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import App from './App'
import '../styles/style.css'

ReactDOM.render(
    <Router>
        <App/>
    </Router>
    , document.getElementById('container'))
