// button




const loadLessons = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then( (res) => res.json())
    .then( (data) =>  displayLesson(data))
}
const displayLesson = (lessons)=>{

    // get the container and container empty

    const levelContainer = document.getElementById("level-container")

    levelContainer.innerHTML = ""



    //  get into every lesson

   for (let lesson of lessons) {
    
   console.log(lesson);

        //    1. create element

        const btnDiv = document.createElement("div")

        btnDiv.innerHTML = `


        <button href="" id= "lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> Lesson-${lesson.level_no}</button>


        
        `




    // 2. append into container

    levelContainer.append(btnDiv)
        
        
   }



    console.log(lessons);



}

loadLessons()