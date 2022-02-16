import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import AppRouter from './routers/AppRouter'

import 'react-toastify/dist/ReactToastify.css'
import './styles/styles.scss'
import { ToastContainer } from 'react-toastify'

import { ScrollToTopButton } from './cdui'
import { animateScroll } from 'react-scroll'

// AUTH NOT NEEDED AT THIS POINT
// if (ls('authorization')) {
//   const token = jwtDecode(ls('authorization'))
//   console.log('decoded: ', token)

//   if (Date.now() < token.expDate) {
//     store.dispatch(login(token.data))
//   } else {
//     store.dispatch(startLogout())
//   }
// }

const jsx = (
  <Provider store={store}>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover />
    <AppRouter />
    <ScrollToTopButton handleClick={() => { animateScroll.scrollToTop() }} />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
