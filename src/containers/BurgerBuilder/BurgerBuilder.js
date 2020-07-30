import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.4,
    cheese:1.3,
    meat:0.7
}
class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false
    }

    //update adding ingredients and totalprice in state
    addIngredeientHandler = (type)=>{
       const oldCountIng = this.state.ingredients[type];
       const newCountIng = oldCountIng+1;
       const updatedIng = {...this.state.ingredients};
       updatedIng[type] = newCountIng;
       const newTotalPrice = this.state.totalPrice+INGREDIENT_PRICES[type];
       this.setState({ingredients:updatedIng,totalPrice:newTotalPrice});
       this.updatePurchaseState(updatedIng);
    }
    removeIngredeientHandler = (type)=>{
        const oldCountIng = this.state.ingredients[type];
        if(oldCountIng<=0){
            return;
        }
        const newCountIng = oldCountIng-1;
        const updatedIng = {...this.state.ingredients};
        updatedIng[type] = newCountIng;
        const newTotalPrice = this.state.totalPrice-INGREDIENT_PRICES[type];
        this.setState({ingredients:updatedIng,totalPrice:newTotalPrice});
        this.updatePurchaseState(updatedIng);
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map((ingredientKey)=>{
            return ingredients[ingredientKey];
        }).reduce((sum,element)=>sum+element,0);
        this.setState({ purchasable : sum>0 });
        
    }


    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        
        return (
            <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientAdded={this.addIngredeientHandler}
            ingredientRemoved={this.removeIngredeientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;