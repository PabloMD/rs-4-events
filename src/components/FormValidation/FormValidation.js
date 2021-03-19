import React from 'react';
import { InputWrapper } from '.';
import Section from '../Layout';

import './FormValidation.css';

class FormValidation extends React.Component{
    constructor(props){
        super(props);

        this.state = Object.assign({}, props, {errors: {}});
    }

    isFormValid = () => {
        const errors = {};
        [...Object.entries(FormValidation.defaultProps), ['gender']].forEach(([name,]) => {
            if(this.state[name] === false || this.state[name].length === 0){
                errors[name] = 'Required';
            }
        });

        if(Object.keys(errors).length){
            this.setState({errors: errors});
            return false;
        }else{
            this.setState({errors: {}});
            return true;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.isFormValid()){
            //reset state
            this.setState({...FormValidation.defaultProps, sent: true});
        }else{
            this.setState({sent: false});
        }
    }

    onInputChange = e => {
        const propName = e.target.name;
        this.setState({ [propName]: e.target.value });
    }

    onCheckboxChange = e => {
        const propName = e.target.name;
        this.setState({ [propName]: e.target.checked });
    }


    render(){
        const genderOptions = [
            {
                id: 1,
                value: 'Female'
            },
            {
                id: 2,
                value: 'Male'
            }
        ];

        return(
            <Section title="Form validation">
                { this.state.sent ? <h2>Thanks for sending!</h2> : null}
                <form onSubmit={this.handleSubmit}>
                    <InputWrapper errors={this.state.errors.name} >
                            <input value={this.state.name} placeholder="Name" type="text" name="name" onChange={this.onInputChange} />
                    </InputWrapper>
                    <InputWrapper errors={this.state.errors.email}>
                        <input value={this.state.email} placeholder="Email" type="text" name="email" onChange={this.onInputChange} />
                    </InputWrapper>
                    <InputWrapper errors={this.state.errors.bio}>
                        <textarea value={this.state.bio} placeholder="Bio" name="bio" onChange={this.onInputChange} />
                    </InputWrapper>
                    <InputWrapper errors={this.state.errors.gender}>
                        <label>Gender: </label>
                        {genderOptions.map((item, i) =>(
                                <label  key={item.id}>
                                    <input name="gender" type="radio" checked={this.state.gender === item.value} value={item.value} onChange={this.onInputChange} />{item.value}
                                </label>
                        ))}
                    </InputWrapper>

                    <InputWrapper errors={this.state.errors.regulations}>
                        <label><input checked={this.state.regulations} type="checkbox" name="regulations" onChange={this.onCheckboxChange}   /> I Accept the rules</label>
                    </InputWrapper>


                    <button type="submit">Submit</button>
                </form>
            </Section>
            );
        }
}

FormValidation.defaultProps = {
    name: '',
    email: '',
    bio: '',
    gender: '',
    regulations: false
};
export default FormValidation;

