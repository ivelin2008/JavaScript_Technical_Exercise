import Component from '@ember/component';

export default Component.extend({
  tagName: 'li',

  classNames: ['movie-list-item'],
  delete: null,
  movie: null,
  actions: {
    toggleEditMode() {
      this.toggleProperty('isEditMode');
    },
    deleteMovie() {
      let movie = this.get('movie');
      const deleteMovie = this.get('delete');
      deleteMovie(movie.id);
      Swal.fire({
        title: movie.title,
        text: '..was deleted successfully!',
        type: 'success',
        confirmButtonText: 'Okay'
      })
    }
  },
});
