const API_KEY = "AIzaSyA5EbDZkP35WPXPJGinjjrLTsmf0kfgkvU";

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
