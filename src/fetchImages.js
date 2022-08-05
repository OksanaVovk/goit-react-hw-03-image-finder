function fetchImages(searchWord) {
  const KEY = `27331775-d4865903e456a7e108fc4ea1d`;
  let page = 1;
  const URL = `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  console.log(URL);
  fetch(URL).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`The image ${searchWord} didn't find`));
  });
}

export default fetchImages;
