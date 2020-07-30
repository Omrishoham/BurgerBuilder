import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props)=>{
    //returning array of arrays of burger ingredients
    let transformedIngredients = Object.keys(props.ingredients).map((ingredientKey)=>{
        return [...Array(props.ingredients[ingredientKey])].map((_,index)=>{
            return <BurgerIngredient key={ingredientKey+index} type={ingredientKey} />
        })
    }).reduce((arr,element)=>{
        return arr.concat(element);//merge the arrays and return to accamulator that is the "arr", arr starts []
    },[]);

    if(transformedIngredients.length ===0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;
