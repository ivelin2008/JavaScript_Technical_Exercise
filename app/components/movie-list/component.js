import Component from '@ember/component';

export default Component.extend({
  tagName: 'ul',

  classNames:['movie-list'],

  movies: null,
  sortProperties: ['title:asc'],
  sortedMovies: Ember.computed.sort('movies', 'sortProperties')
});
