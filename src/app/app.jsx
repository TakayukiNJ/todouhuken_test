import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from 'store/reducers'
import rootSaga from 'store/sagas'
import DataExplorerContainer from 'app/dataExplorer/container'
import './style.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

const App = () => (
  <Provider store={store}>
    <div className='app'>
      <h1>都道府県別の総人口推移グラフ</h1>
      <DataExplorerContainer />
    </div>
  </Provider>
)

export default App
