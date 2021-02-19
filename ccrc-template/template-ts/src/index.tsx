import React from 'react'
import ReactDOM from 'react-dom'

import '#/projectConfig'
import './stylesheets/styles.scss'

import App from '@/App/App'

import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
