import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './services'

ReactDOM.createRoot( document.querySelector( '#root' )! ).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)
