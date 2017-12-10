import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import capitalize from 'capitalize'
import './CategoriesList.css'

class CategoriesList extends Component {
  render() {
    const { categories } = this.props
    return (
      <div className="blog-categories">
        <nav>
          <Link to="/"><b>Show All</b></Link>
          {categories.map((cat) => (
            <Link className="categories" key={cat.path} to={`/${cat.path}`}>
              {capitalize.words(cat.name)}
            </Link>
          ))}
        </nav>
    </div>
    );
  }
}

export default CategoriesList
