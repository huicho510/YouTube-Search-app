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
      key: "AIzaSyCqwI05ORMpX61DaeUhJJVKa82JEubuLpA",
    },
    function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      console.log(data);

      $.each(data.items, function (i, item) {
        // Get Output
        let output = getOutput(item);

        // Display Results
        $("#results").append(output);
      });

      let buttons = getButtons(prevPageToken, nextPageToken);

      // Display Buttons
      $("#buttons").append(buttons);
    }
  );
}

// BUild Output

function getOutput(item) {
  let videoId = item.id.videoId;
  let title = item.snippet.title;
  let description = item.snippet.description;
  let thumb = item.snippet.thumbnails.high.url;
  let channelTitle = item.snippet.channelTitle;
  let videoDate = item.snippet.publishedAt;

  // Build output string
  let output =
    "<li>" +
    '<div class="list-left">' +
    '<img src="' +
    thumb +
    '">' +
    "</div>" +
    '<div class = "list-right">' +
    "<h3>" +
    title +
    "</h3>" +
    '<small>By <span class="cTitle">' +
    channelTitle +
    "</span> on " +
    videoDate +
    "</small>" +
    "<p>" +
    description +
    "</p>" +
    "</div>" +
    "</li>" +
    '<div class="clearfix"></div>' +
    "";
  return output;
}

// Build the buttons
function getButtons(prevPageToken, nextPageToken) {
  if (!prevPageToken) {
    let btnoutput =
      '<div class="button-container">' +
      '<button id="next-button" class="paging-button" data-token="' +
      nextPageToken +
      '" data-query="' +
      q +
      '"' +
      'onclick="nextPage();">Next Page</button></div>';
  } else {
    let btnoutput =
      '<div class="button-container">' +
      '<button id="prev-button" class="paging-button" data-token="' +
      prevPageToken +
      '" data-query="' +
      q +
      '"' +
      'onclick="prevPage();">Prev Page</button>' +
      '<button id="next-button" class="paging-button" data-token="' +
      nextPageToken +
      '" data-query="' +
      q +
      '"' +
      'onclick="nextPage();">Next Page</button></div>';
  }

  return btnoutput;
}
