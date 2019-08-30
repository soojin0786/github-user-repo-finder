'use strict';



function getResults() {
  let userHandle = $('input[name="user-handle"]').val();
  const url = `https://api.github.com/users/${userHandle}/repos`;

  fetch(url)
  .then(response => {
    if (response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></li>`
    )
  }
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getResults();
  })
}

$(watchForm);