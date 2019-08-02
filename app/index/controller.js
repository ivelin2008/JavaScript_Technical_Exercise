import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addMovie(title, description, image, rating) {
      const newMovie = this.store.createRecord('movie', {
        title,
        description,
        image,
        rating
      });
      newMovie.save();
    },
    updateMovie(id, title, description, image, rating) {
      let that = this;
      let promise = new Promise(function(resolve, reject) {
        that.store.findRecord('movie', id).then(function(movie) {
          // ...after the record has loaded
          movie.set(
            title,
            description,
            image,
            rating
          )
          movie.save();
          resolve(`"${title}" movie was updated successfully!`)
        });
      });
      return promise; 
    },
    deleteMovie(id) {
      this.store.findRecord('movie', id).then(function(movie) {
        // ...after the record has loaded - delete and save
        movie.deleteRecord();
        movie.save();
      });
    }
  }
});