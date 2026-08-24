import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ConfigProvider theme={{ token: { colorPrimary: "#450C3F" } }}>
    <Provider store={store}>
       <App />
    </Provider>
    </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
