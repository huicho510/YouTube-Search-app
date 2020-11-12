// Searchbar handler
$(function () {
  let searchField = $("#query");
  let icon = $("#search-btn");

  // Focus Event Handler

  $(searchField).on("focus", function () {
    $(this).animate(
      {
        width: "100%",
      },
      400
    );
    $(icon).animate(
      {
        right: "10px",
      },
      400
    );
  });

  // Blur Event Handler
  $(searchField).on("blur", function () {
    if (searchField.val() == "") {
      $(searchField).animate(
        {
          width: "45%",
        },
        400,
        function () {}
      );
      $(icon).animate({
        right: "360px",
      });
    }
  });
});

function search (){
    // Clear results
    $('#results').html('');
    $('#buttons').html('');

    // Get form input

    q = $('#query').val();

    // Run GET request on API

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyA5EbDZkP35WPXPJGinjjrLTsmf0kfgkvU'},
            function(data){
                let nextPageToken = data.nextPageToken;
                let prevPageToken = data.prevPageToken;

                console.log(data);
            }

    )
}
