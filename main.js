// client_id key
const CLIENT_ID = '805702408092-hoj8arl5nsm7o8c7eu18unhm0dcvk0ra.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const searchForm = document.getElementById('search-form');
const videoContainer = document.getElementById('video-container');
const searchInput = document.getElementById('search-input');
const orderInput = $("input:radio[name=option]:checked").val();

// actualizou


// Form submit
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  init();

});

// Load auth2 library
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Init API client library and set up sign in listeners
function initClient() {
  gapi.client
    .init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    })
    .then(() => {
      // Listen for sign in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle initial sign in state
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}

// Update UI sign in state changes
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    content.style.display = 'block';
    videoContainer.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    content.style.display = 'none';
    videoContainer.style.display = 'none';
  }
}

// Handle login
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

// Handle logout
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

// initialize the key and launchs function to send the search string and receive the data from youtube api
  function init () {
    gapi.client.setApiKey = CLIENT_ID;
    gapi.client.load("youtube", "v3", function () {
  
    });


  
// function to send the search string and receive the data from youtube api
  $(function (){
    
    $("form").on("submit", function(e) {
         e.preventDefault();
         const search = searchInput.value;
         window.alert(orderInput);

      var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: search, 
        maxResults: 24,
        order: "viewCount"
       });
  
       let output = '<br><h4 class="center-align">Most popular</h4>';
  
       request.execute(function(response) {
         console.log(response);
         var results = response.result;
  
         $.each (results.items, function (index, item) {
           console.log (item);
            $("#results").append(item.id.videoId+" "+item.snippet.title+"<br>");
  
            const videoId = item.id.videoId;
  
          output += `
            <div class="col s3">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          `;
        });
  
        // Output videos
        videoContainer.innerHTML = output;
        });
  
         });
       });


}