export default async function fetchImages(word, page) {
  const KEY = `27331775-d4865903e456a7e108fc4ea1d`;
  const url = `https://pixabay.com/api/?q=${word}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
