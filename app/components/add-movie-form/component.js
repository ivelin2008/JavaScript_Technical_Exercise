import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  classNames: ['add-movie-form'],
  error: null,
  id: null,
  title: null,
  image: null,
  description: null,
  options: ['-', 1, 2, 3, 4, 5],
  selectedRating: null,
  editMode: false,
  add:null,
  update:null,

  submit (event) {
    event.preventDefault();
    const add = this.get('add');
    const update = this.get('update');
    const id = this.get('id');
    const title = this.get('title');
    const description = this.get('description');
    const image = this.get('image');
    const selectedRating = this.get('selectedRating');
    const editMode = this.get('editMode');
    
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
    if(editMode) {
      update(id, title, description, image, selectedRating).then((data) => {
        this.setProperties({'editMode': false });
        // Show notification that movie was updated successfully
        Swal.fire({
          title: title,
          text: '..was updated successfully!',
          type: 'success',
          confirmButtonText: 'Okay'
        })
      });
      return;
    }
    add(title, description, image, selectedRating);

    // Clear fields 
    $('#ratingSelectBox').val('-');
    this.setProperties({'title': null, 'image': null, 'description': null, 'selectedRating': null});
    
    // Show notification that movie just got added to the list
    Swal.fire({
      title: title,
      text: '..was added to the list!',
      type: 'success',
      confirmButtonText: 'Okay'
    })
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