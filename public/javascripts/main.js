$(document).ready(function() {
  $('.delete-button').click(function(e) {
    e.preventDefault();
    const articleId = $(this).data('article-id');
    $.ajax({
      url: '/articles/' + articleId,
      type: 'DELETE',
      complete: function(response) {
        if (response.status === 200) {
          location.reload();
        } else {
          alert('Something went wrong\nStatus code: ' + response.status);
        }
      }
    });
  });
});
