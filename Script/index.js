const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then((json) => displayLesson(json.data));
}

const loadLevelWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=> res.json())
    .then((data)=>displayLevelWord(data.data));
}

//{id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার'}
const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById('word-container');
    wordContainer.innerHTML="";
    if(words.length==0){
        wordContainer.innerHTML=`
            <div class="text-center col-span-full space-y-4">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="font-bangla text-[#79716b]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="text-xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
            </div>
        `;
    }
    words.forEach(word => {
        //console.log(word);
        const card=document.createElement("div");
        card.innerHTML=`
            <div class="bg-white p-5 text-center rounded-xl shadow-sm space-y-4">
            <h3 class="text-2xl font-bold"> ${word.word?word.word:"word not found"} </h3>
            <p class="font-normal">Meaning/Pronunctuation</p>
            <p class="text-xl font-semibold font-bangla">${word.meaning?word.meaning:"meaning not found"}/${word.pronunciation?word.pronunciation:"Pronunciation not found"}</p>
            <div class=" flex justify-between items-center mt-10">
                <button class="btn bg-[#1a91ff1a] rounded-lg hover:bg-sky-300"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a] rounded-lg hover:bg-sky-300"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            </div>
        `;
        wordContainer.append(card);
    });
}
const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
          <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i>
          Lesson ${lesson.level_no} </button>
        `;
        levelContainer.append(btnDiv);
    }
};
loadLessons();