import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/constants'
import '@/stylesheets/styles.css'

import Sandbox from '@/containers/Sandbox'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <Sandbox />
    </div>
  </React.StrictMode>,
)
