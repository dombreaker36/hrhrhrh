window.addEventListener('load', ()=>{
   question_banks =  []
   answer_bank = []
  const questions = document.querySelector('.question-1');
  const no_of_questions = document.querySelector('.no-ques');
  const newformques = document.querySelector('.form2');
  const newques = document.querySelector('#textarea');

newformques.addEventListener('submit', (e)=>{
    e.preventDefault()

    const question = newques.value

 
    if(!question) {
      alert("Add a question before submission!")
      return
    } 
    const newquestion = document.createElement('div')
    const mybtns = document.createElement('div')
    const icon = document.createElement('button')
    const ansbtn = document.createElement('button')
    const linkans = document.createElement('a')
    const anslet = document.createElement('div')
    const answersForm = document.createElement('form')
    answersForm.classList.add('form3')
    const h2  = document.createElement('h2')
    h2.innerHTML = 'Answers'
    answersForm.innerHTML = (`
    <label for="texTarea">
        <label for="texTarea">Answer Question:</label>
      <textarea id="texTarea" cols="30" rows="10"></textarea>
      <input type="submit" class="btn submitbtn" value="Post Answer">
      </label>`)
    linkans.setAttribute('href', `./answer.html`)
    linkans.innerHTML = question
    mybtns.classList.add('mybtns')
    icon.classList.add('deletebtn')
    ansbtn.classList.add('ansbtn')
    icon.innerHTML= '<button>Delete</button>'
    ansbtn.innerHTML= '<button>Answer</button>'
    mybtns.appendChild(icon)
    mybtns.appendChild(ansbtn)
    newquestion.appendChild(linkans)
    newquestion.appendChild(mybtns)
    newquestion.appendChild(h2)
    newquestion.appendChild(answersForm)
     questions.appendChild(newquestion)
    question_banks.push(newquestion)
    localStorage.setItem('question_banks', JSON.stringify(question_banks))

    question_banks.forEach((question_bank)=>{
     
      icon.addEventListener('click', ()=>{
        questions.removeChild(newquestion)
        question_banks.pop(question_bank)
        no_of_questions.innerHTML = question_banks.length
      })
    }) 
    no_of_questions.innerHTML = question_banks.length
    ansbtn.addEventListener('click',()=>{
      answersForm.style.display = 'block'
    })
    const postAnswer = document.querySelector('.submitbtn');
    const newanswerform = document.querySelector('.form3')
    const myans = document.querySelector('#texTarea')

    const number_answers = document.querySelector('.number-ans')
  
  
  newanswerform.addEventListener('submit', (e)=>{
  
    console.log(123)
    const ansval= myans.value
     
    if(!ansval) {
      alert("Add a question before submission!")
      return
    }
    const ansdiv = document.createElement('div');

    ansdiv.classList.add('myans')
  
    ansdiv.innerHTML= ansval 
    answer_bank.push(ansdiv)
    
    newquestion.appendChild(ansdiv)

    number_answers.innerHTML = answer_bank.length
    
  e.preventDefault()
  e.target.reset()

   answersForm.style.display = 'none'

  })
  e.target.reset()
  })
    
  })
