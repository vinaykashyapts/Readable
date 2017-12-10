import React, {Component} from 'react';
import capitalize from 'capitalize'
import { Link } from 'react-router-dom'
import './CategoryTag.css'

class CategoryTag extends Component {
  render() {
    const { category = '...' } = this.props
    return (
      <div className='category-tag'>
        <span><Link to={`/${category}`}>{capitalize.words(category)}</Link></span>
      </div>
    );
  }
}

export default CategoryTag
