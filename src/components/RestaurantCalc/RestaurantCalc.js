import React from 'react';
import Section from '../Layout';

const tipOptions = [5,10,15,20];
const vatRate = 0.23;

class RestaurantCalc extends React.Component{
    state = {
        amountToPay: undefined,
        amount: undefined,
        tip: tipOptions[0]
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({
            amountToPay: ((this.state.amount * ((100.0 + this.state.tip )/100) ) * (vatRate + 1)).toFixed(2)
        });

    }
    handleChange = (e) => {
        this.setState({[e.target.name]: parseFloat(e.target.value)});
    }

    handleReset = (e) => {
        this.setState({ amountToPay: undefined, amount: '' });
    }

    render(){
        return(
            <Section title="Restaurant Calculator Class">
            { this.state.amountToPay ?
                <div>
                    <div>
                        <strong>{this.state.amountToPay} Gross</strong>
                    </div>
                    <button onClick={this.handleReset} type="button">Reset</button>
                </div>
                 :
                <form onSubmit={this.handleFormSubmit}>
                    <div>
                        <input name="amount" type="number" placeholder="Net amount" onChange={this.handleChange} step="any" />
                    </div>
                    <div>
                        <select name="tip" value={this.state.tip}  onChange={this.handleChange}>
                            { tipOptions.map((percent, i) =>
                                <option key={i} value={percent}>{percent}%</option>
                            )}
                        </select>
                    </div>
                    <button type="submit">Convert</button>
                </form>
                }
            </Section>
        );
    }
}

export default RestaurantCalc;