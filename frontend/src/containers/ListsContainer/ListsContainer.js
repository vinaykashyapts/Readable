import React, {Component} from 'react';
import PostsList from '../../components/PostsList/PostsList'
import CategoriesList from '../../components/CategoriesList/CategoriesList'
import { firstCall, selectSort, deletePostCall, voteIssuing, editPost} from '../../actions'
import { connect } from 'react-redux'
import Select from 'react-select'
import capitalize from 'capitalize'
import 'react-select/dist/react-select.css';
import './ListsContainer.css'



class ListsContainer extends Component {
  render() {
    const { options, sortBy, selected, filterByCat , categories, category, postVote, postDelete, postEdit } = this.props
    const printCategory = (categories.map(cat => cat.path).includes(category) || category === 'All Categories')? category : "Category not found"
    return (
      <div className="blog-list">
        <CategoriesList categories={categories}/>
        <div className="sort-breadcumb">
          <h3>{capitalize.words(printCategory)}</h3>
          <Select className="sort-dropdown" value={selected} options={options} onChange={sortBy} resetValue={'SHOW_ALL'}/>
        </div>
        <PostsList selected={selected} posts={filterByCat} onDeletePost={postDelete} onVotePost={postVote} onEditPost={postEdit}/>
      </div>
    )}
}

const mapStatetoProps = ({ entities, uiState }, ownProps) => {
  const { categories, posts } = entities
  const { options, selected } = uiState.sortBy
  const category = ownProps.match.params.category || 'All Categories'
  const filterByDel = Object.keys(posts.byId).map(id => posts.byId[id]).filter(post => !post.deleted)
  const filterByCat = category === 'All Categories' ?  filterByDel : filterByDel.filter(post => post.category === category)
  return {
    options,
    selected,
    categories: Object.keys(categories.byId).map(id => categories.byId[id]),
    category,
    filterByCat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    firstCall: () => dispatch(firstCall()),
    sortBy: (value) => dispatch(selectSort(value)),
    postDelete: (id) => dispatch(deletePostCall(id)),
    postVote: (id, option) => dispatch(voteIssuing(id,option)),
    postEdit: (postChanges) => dispatch(editPost(postChanges))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ListsContainer)
