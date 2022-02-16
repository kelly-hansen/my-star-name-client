import React, { lazy, Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'
import { Loading } from '../cdui'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import ScrollToTop from './ScrollToTop'
import AppWrapper from './AppWrapper'

const LandingPage = lazy(() => import('../components/LandingPage'))
const FormPage = lazy(() => import('../components/NameForms/FormPage'))
const DisplayName = lazy(() => import('../components/DisplayName'))
const NamesTable = lazy(() => import('../components/NamesTable'))

export const history = createHistory()

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <div className='container-scroller'>
          <NavBar/>

          <AppWrapper>
            <Suspense fallback={<Loading main={true} />}>
              <Switch>
                <Route path='/' component={LandingPage} exact />

                <Route path='/generate-name' component={FormPage} exact />
                <Route path='/display-name' component={DisplayName} exact />

                <Route path='/table' component={NamesTable} exact />
              </Switch>
            </Suspense>
          </AppWrapper>

          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  )
}

AppRouter.propTypes = {
}

export default AppRouter
