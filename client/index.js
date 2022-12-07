import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { Auth0Provider } from '@auth0/auth0-react'

import store from './store'
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="aihe-popoto-2022-william.au.auth0.com"
      clientId="OoA5kws1BA7URS6SPhLwZXSLr0LJwgJM"
      redirectUri={window.location.origin}
      audience="https://money-track/api"
    >
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline>
            <App />
          </CssBaseline>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
