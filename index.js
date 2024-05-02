const movieId = "66329a37c112de1911479d80"; // Replace with the actual ID of the movie

fetch(`http://localhost:3000/api/movies/${movieId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Movie fetched successfully:', data);
        console.log(data.genres);
    })
    .catch(error => {
        console.error('Failed to fetch movie:', error);
    });
