import React from 'react'
import ReactDOM from 'react-dom/client'

import './constants/projectConfig'
import './stylesheets/styles.scss'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <div>App</div>
  </React.StrictMode>
)

reportWebVitals()
