import React, {Component} from 'react';
import {connect} from 'react-redux';

class CarList extends Component
{
    showList()
    {
        return this.props.key_1.map((CAR) => {
            return (
                <li key={CAR.id}>{CAR.label}</li>
            );
        });
    }
    render() 
    {
        return(
            <ol>
                {this.showList()}
            </ol>
        );
    }
}

function mapStateToProps (state)
{
    return{
        key_1: state.cars
    };
}    


export default connect(mapStateToProps)(CarList);