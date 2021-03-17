import './App.css';

import RestaurantCalc, { RestaurantCalcFunc } from './components/RestaurantCalc';

function App() {
  return (
    <div className="App">
      <RestaurantCalc />
      <RestaurantCalcFunc />
    </div>
  );
}

export default App;
