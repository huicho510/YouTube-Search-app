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

  $("#search-form").submit(function (e) {
    e.preventDefault();
  });
});

function search() {
  // Clear results
  $("#results").html("");
  $("#buttons").html("");

  // Get form input

  q = $("#query").val();

  // Run GET request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      part: "snippet, id",
      q: q,
      type: "video",
      key: "AIzaSyA5EbDZkP35WPXPJGinjjrLTsmf0kfgkvU",
    },
    function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      console.log(data);

       $.each(data.items, function(i, item){
           // Get Output
            let output = getOutput(item);

            // Display Results
            $('#results').append(output);
       })

       
    }
  );
}

// BUild Output

function getOutput(item){
    let videoId = item.id.videoId;
    let title = item.snippet.title;
    let description = item.snippet.description;
    let thumb = item.snippet.thumbnails.high.url;
    let channelTitle = item.snippet.channelTitle;
    let videoDate= item.snippet.publishedAt;

    // Build output string
    let output = '<li>' +
    '<div class="list-left">' +
    '<img src="'+ thumb +'">' +
    '</div>' +
    '<div class = "list-right">' +
    '<h3>'+title+'</h3>' +
    '<small>By <span class="cTitle">'+channelTitle+'</span>on '+videoDate+'</small>'+
    '<p>'+description+'</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';
    return output;
}
