import './App.css';
import ExpenseCalculator from './components/ExpenseCalculator/ExpenseCalculator';

import FormikValidation from './components/FormikValidation';
import FormValidation from './components/FormValidation';
import RestaurantCalc, { RestaurantCalcFunc } from './components/RestaurantCalc';


function App() {
  return (
    <div className="App">
      <ExpenseCalculator />
      <FormikValidation />
      <FormValidation />
      <RestaurantCalc />
      <RestaurantCalcFunc />
    </div>
  );
}

export default App;
