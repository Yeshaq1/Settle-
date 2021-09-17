import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const foodList = [
    {
        name: 'Seat 1',
        price: '21.75',
        recipes: [
            {
                name: '1/4 Chicken wings',
                price: '3.00'
            },
            {
                name: '1 Cheeseburger',
                price: '15.00'
            },
            {
                name: '1/4 Beer pitcher',
                price: '17.00'
            }
        ]

    },
    {
        name: 'Seat 2',
        price: '51.75',
        recipes: [
            {
                name: '1/4 Chicken wings',
                price: '13.00'
            },
            {
                name: '1 Cheeseburger',
                price: '5.00'
            },
            {
                name: '1/4 Beer pitcher',
                price: '7.00'
            }
        ]

    }
]

export default class PayableBillComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: false,
            selctedRecipes: {

            }
        }
    }

    getRecipeCheckValue(parentIndex, childIndex) {
        let { selctedRecipes } = this.state
        var value = 0;
        if (selctedRecipes[parentIndex] !== undefined && selctedRecipes[parentIndex][childIndex] !== undefined) {
            value = 1
        }

        return value
    }

    recipeCheckboxClicked = (parentIndex, childIndex, value) => {
        let { selctedRecipes } = this.state
        if (selctedRecipes[parentIndex] !== undefined && selctedRecipes[parentIndex][childIndex] !== undefined) {
            delete selctedRecipes[parentIndex][childIndex]
        } else {
            if (selctedRecipes[parentIndex] === undefined)
                selctedRecipes[parentIndex] = {}

            selctedRecipes[parentIndex][childIndex] = value
        }

        this.setState({ selctedRecipes })

    }

    selectList(index, list, type) {
        let { selctedRecipes } = this.state
        // console.log('selctedRecipes', selctedRecipes)
        if (type !== 'all') {
            if (selctedRecipes[index] !== undefined) {
                delete selctedRecipes[index]
            } else {
                if (selctedRecipes[index] === undefined)
                selctedRecipes[index] = {}
                list.map((recipe, childIndex) => selctedRecipes[index][childIndex] = recipe.price)
            }
        } else {
            if (!selctedRecipes.hasOwnProperty(index)) {  
                selctedRecipes[index] = {}
                list.map((recipe, childIndex) => selctedRecipes[index][childIndex] = recipe.price)
            } else {
                console.log('ELSE', selctedRecipes[index])
            }
        }
        
        this.setState({ selctedRecipes })

    }

    selectAllRecipe = () => {
        foodList.map((list, index) => {
            this.selectList(index, list.recipes, 'all')
        })
    }

    getSelectAllChecked() {
        let { selctedRecipes } = this.state
        var allSelected = true
        foodList.map((list, index) => {
            if (selctedRecipes[index] === undefined || Object.keys(selctedRecipes[index]).length !== list.recipes.length) {
                allSelected = false
            }
        })
        return allSelected
    }


    render() {
        let { selctedRecipes } = this.state
        return (
            <>
                <div className="pt-4">
                    <div className="px-3">
                        <div className="form-group form-check">
                            <input onClick={() => this.selectAllRecipe()} value={true} checked={this.getSelectAllChecked()} type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label
                                className="form-check-label font-weight-bold text-dark1"
                                htmlFor="exampleCheck1"
                            >Select all</label>
                        </div>
                    </div>
                    <hr />

                    {foodList.map((list, parentIndex) => (
                        <div key={parentIndex}>

                            <div className="px-3">

                                <div className="form-group form-check">
                                    <input checked={(selctedRecipes[parentIndex] !== undefined && Object.keys(selctedRecipes[parentIndex]).length === list.recipes.length)} value={true} onClick={() => this.selectList(parentIndex, list.recipes)} type="checkbox" className="form-check-input" id={`mainList${parentIndex}`} />
                                    <label className="form-check-label font-weight-bold text-dark d-flex align-items-center justify-content-between" htmlFor={`mainList${parentIndex}`}>
                                        <span>{list.name}</span>
                                        <span>$ {list.price}</span>
                                    </label>
                                </div>

                                <div className="px-4">
                                    {list.recipes.map((recipe, index) => (


                                        <div className="form-group form-check" key={index}>
                                            <input type="checkbox" value={recipe.price} onClick={() => this.recipeCheckboxClicked(parentIndex, index, recipe.price)} checked={this.getRecipeCheckValue(parentIndex, index)} className="form-check-input" id={`recipe${parentIndex}${index}`} />
                                            <label className="form-check-label font-weight-bold text-dark d-flex align-items-center justify-content-between" htmlFor={`recipe${parentIndex}${index}`}>
                                                <span>{recipe.name}</span>
                                                <span>$ {recipe.price}</span>
                                            </label>
                                        </div>

                                    ))}

                                </div>
                            </div>
                            {/* Seat end */}


                            <hr />
                        </div>
                    ))}

                </div>
                <div className="py-5"></div>
                <div className="position-fixed bottom-0 left-0 w-100">
                    <Link to="/guest-pay" className="btn btn-primary w-100 rounded-0 shadow-none py-2">Proceed</Link>
                </div>
            </>
        )
    }
}
