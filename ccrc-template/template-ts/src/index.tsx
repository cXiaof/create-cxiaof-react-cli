import React from 'react'
import ReactDOM from 'react-dom/client'

import './constants/projectConfig'
import './stylesheets/styles.css'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div>App</div>
  </React.StrictMode>,
)

reportWebVitals()
