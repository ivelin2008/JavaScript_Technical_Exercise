import Component from '@ember/component';

export default Component.extend({
  tagName: 'ul',
  classNames:['movie-list'],
  actions: {
    toggleSorting() {
      this.toggleProperty('isSortedByRating');
    }
  },

  movies: null,
  sortByTitle: ['title:asc'],
  sortByRating: ['rating:desc'],
  sortedMoviesByTitle: Ember.computed.sort('movies', 'sortByTitle'),
  sortedMoviesByRating: Ember.computed.sort('movies', 'sortByRating'),
});
