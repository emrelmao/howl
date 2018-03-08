import React from 'react';
import { connect } from 'react-redux';

import { selectArticleChunks } from '../../reducers/selectors.js';
import { fetchArticle } from '../../actions/article_actions';

import ArticleHeader from './article_header';
import ArticleBody  from './article_body';
import ArticleFooter from './article_footer';

class ArticleShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchArticle(this.props.articleId);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.articleId !== nextProps.articleId){
      this.props.fetchArticle(nextProps.articleId);
    }
  }

  render(){
    if (this.props.article.chunks.length === 0 || !this.props.author.length === 0) {
      return <div></div>;
    }
    return(
      <div className="article_show">
        <ArticleHeader article={this.props.article} author={this.props.author}/>
        <ArticleBody chunks={this.props.chunks} edit={this.props.edit}/>
        <ArticleFooter article={this.props.article} author={this.props.author}/>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const articleId = ownProps.match.params.articleId;
  const article = state.ents.articles[articleId] || {chunks: []};
  const author = state.ents.users[article.author_id] || {};
  const edit = (ownProps.match.params.edit === "edit");
  debugger
  return {
    articleId: articleId,
    article: article,
    chunks: selectArticleChunks(state, article),
    author: author,
    edit: edit
  };
};

const mdp = (dispatch) => {
  return {
    fetchArticle: (id) => dispatch(fetchArticle(id)),
  };
};

export default connect(msp, mdp)(ArticleShow);
