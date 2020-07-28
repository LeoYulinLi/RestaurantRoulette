// src/components/profile/profile.js
import React from "react";
import { Link } from 'react-router-dom'
import RestaurantHistory from "./restaurant_history.jsx";


class Profile extends React.Component {
  constructor(props) {
    super(props) 
    this.state = { filters: [] };
    this.filterChange = this.filterChange.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.currentUser.id);
    // this.props.fetchRestaurantHistory(this.props.currentUser.id);
    this.props.fetchRestaurantHistory();
  }

  componentWillUnmount() {
    this.props.clearRestaurantHistory();
  }

  filterChange(value) {
    if (!this.state.filters.includes(value)) {
      let newFilters = this.state.filters.concat(value)
      this.setState({ filters: newFilters })
    } else {
      console.log('filter already entered')
    }
  }

  render() {
    let filterText = this.state.filters.length === 0 ? <div id='filter-text'>none, click categories to add!</div> : '';

    let filterArray;
    if (this.state.filters !== []) {
    filterArray = 
      this.state.filters.map(category => {
        if (!category.includes('$')) {
          return <div className="filter-ind">{category}</div>
        } else {
          return <div className="filter-ind-price">{category}</div>;
        }
      })
    } 

    let reset;
    if (this.state.filters.length !== 0){
      reset = <button id='reset' onClick={() =>  this.setState({ filters: [] })}>Reset</button>
    }

    let filteredResults = [];
    if (this.state.filters.length !== 0) {
      let numFilters = this.state.filters.length;
      for (let i = 0; i < this.props.restaurants.length; i++) {
        let numApplied = 0;
        let currentRestaurant = this.props.restaurants[i];
        for (let j = 0; j < this.state.filters.length; j++) {
          if (currentRestaurant.categories.map(category => category.title).includes(this.state.filters[j]) || currentRestaurant.price === this.state.filters[j]) {
            numApplied += 1
          }
        } 
        if (numApplied === numFilters) {
          filteredResults.push(currentRestaurant);
        }
      }
    } else {
      filteredResults = this.props.restaurants;
    }

    let history;
    if (!this.props.restaurants) {
      history = <div className='history-container'>Restaurant history is empty!</div>;
    } else {
      history = (
        <div className="history-container">
          <h2 className="history-title">Your Past Spins</h2>
          <div className="filters" className="h-restaurant-cats">
            <div id="current-filters">Current Filters: {filterText} </div>
            {filterArray}
            {reset}
          </div>
          <div className="restaurant-history">
            {filteredResults.map((restaurant, idx) => {
              return (
                <RestaurantHistory
                  key={idx}
                  restaurant={restaurant}
                  filterChange={this.filterChange}
                />
              );
            })}
          </div>
        </div>
      );
    }

   return (
     <>
       {history}
     </>
   );
  }
}

export default Profile;
