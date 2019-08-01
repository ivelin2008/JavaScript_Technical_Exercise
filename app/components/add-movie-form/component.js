import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  classNames: ['add-movie-form'],
  error: null,
  title: null,
  image: null,
  description: null,
  options: ['-', 1, 2, 3, 4, 5],
  selectedRating: null,

  add:null,

  submit (event) {
    const add = this.get('add');
    event.preventDefault();
    const title = this.get('title')
    const description = this.get('description')
    const image = this.get('image');
    const selectedRating = this.get('selectedRating');

    console.log(selectedRating);
    // return;
    // Validate form fields
    let error = ''
    // last 2 params of validate() are the minimum and maximum number of characters allowed for the field
    error += validate(title, 'title', 3, 40)
    error += validate(description, 'description', 3, 200)
    error += validate(image, 'image', 10, 500)

    // Check if rating has been selected
    if(!selectedRating || selectedRating == '-') {
      error += "No rating selected. Please choose movie rating. "
    }

    // If we have an error (1 or more fiels failed validation) - display error
    if(error.length > 0) {
      $('.errorBox').fadeIn(500)
      this.setProperties({'error': error });
      // Fade out error nicely after a few seconds
      setTimeout(() => {
        $('.errorBox').fadeOut(1000)
      }, 5000)
      return;
    } 

    add(title, description, image, selectedRating);
    $('#ratingSelectBox').val('-');
    this.setProperties({'title': null, 'image': null, 'description': null, 'selectedRating': null});
  }
});

function validate(field, name, min, max) {
  if (typeof field !== 'string') return `${capitalize(name)} must be of type string. `
  else if(field.length < min || field.length > max) {
    return `${capitalize(name)} must be between ${min} and ${max} characters long. `
  }
  return "";
}

function capitalize(s){
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}