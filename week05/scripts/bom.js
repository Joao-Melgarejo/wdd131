const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
  displayList(chapter);
});

button.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    const chapter = input.value.trim();
    displayList(chapter);
    chaptersArray.push(chapter);
    setChapterList();
    input.value = '';
    input.focus();
  }
});

function displayList(item) {
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');

  li.textContent = item;
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('aria-label', `Remove ${item}`);
  deleteButton.classList.add('delete');

  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener('click', () => {
    list.removeChild(li);
    deleteChapter(item);
    input.focus();
  });
}

function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

function deleteChapter(chapter) {
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  setChapterList();
}