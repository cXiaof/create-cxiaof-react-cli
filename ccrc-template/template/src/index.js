import React from 'react'
import ReactDOM from 'react-dom'

import './constants/projectConfig'
import './stylesheets/styles.scss'

import App from './components/App/App'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
