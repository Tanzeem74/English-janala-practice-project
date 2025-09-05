const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then((json) => displayLesson(json.data));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            removeActive();
            //console.log(clickBtn);
            clickBtn.classList.add('active');
            displayLevelWord(data.data);
        });
}
const removeActive = () => {
    const lessonBtns = document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach(btn => {
        btn.classList.remove('active');
    });
}
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}
const manageSpinner = (status) => {
    if (status) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}
const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data);
}
const displayWordDetail = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation
        })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    `;
    document.getElementById('modal_word').showModal();
}

//{id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full space-y-4">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="font-bangla text-[#79716b]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="text-xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        manageSpinner(false);
        return;
    }
    words.forEach(word => {
        //console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white p-5 text-center rounded-xl shadow-sm space-y-4">
            <h3 class="text-2xl font-bold"> ${word.word ? word.word : "word not found"} </h3>
            <p class="font-normal">Meaning/Pronunctuation</p>
            <p class="text-xl font-semibold font-bangla">${word.meaning ? word.meaning : "meaning not found"}/${word.pronunciation ? word.pronunciation : "Pronunciation not found"}</p>
            <div class=" flex justify-between items-center mt-10">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] rounded-lg hover:bg-sky-300"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1a91ff1a] rounded-lg hover:bg-sky-300"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
}
const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
          <i class="fa-solid fa-book-open"></i>
          Lesson ${lesson.level_no} </button>
        `;
        levelContainer.append(btnDiv);
    }
};
loadLessons();

document.getElementById('search-btn').addEventListener('click', function () {
    removeActive();
    const input = document.getElementById('search-input');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
            //console.log(filterWords);
            displayLevelWord(filterWords);
        });
})