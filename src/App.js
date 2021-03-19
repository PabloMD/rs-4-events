import './App.css';
import FormikValidation from './components/FormikValidation';
import FormValidation from './components/FormValidation';

// import RestaurantCalc, { RestaurantCalcFunc } from './components/RestaurantCalc';


function App() {
  return (
    <div className="App">
      <FormikValidation />
      <FormValidation />
      {/* <RestaurantCalc /> */}
      {/* <RestaurantCalcFunc /> */}
    </div>
  );
}

export default App;
