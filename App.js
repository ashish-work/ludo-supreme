import { Provider } from 'react-redux';
import store from './stores'
import Game from './components/game'

export default function App() {

  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  );
};