const lettersContainer = document.getElementById('letters-container')
const draw = document.querySelectorAll('.hidden')
const lettersWord = document.getElementById('letters-word')
const buttonHelp = document.getElementById('button-help')

const myArray = [
  ['laguna', 'agua'],
  ['teclado', 'periférico'],
  ['hulk', 'avengers']
]
const rand = Math.floor(Math.random() * myArray.length)
let word = myArray[rand][0]
let clue = myArray[rand][1]

const lifes = draw.length
const letters = word.split('')

const paintBlocks = () => {
  letters.forEach((_, index) => {
    lettersWord.innerHTML += `
    <div class="letter-block-word" data-index="${index}"></div>`
  })
}

buttonHelp.addEventListener('click', () => alert(`La pista es: ${clue}`))

function initGame() {
  paintBlocks()

  const blocks = document.querySelectorAll('[data-index]')

  let indexDraw = 0
  let countBlocksDone = 0

  document.addEventListener('keypress', e => {
    const pressedLetter = e.key.toLowerCase()

    if (
      (pressedLetter >= 'a' && pressedLetter <= 'z') ||
      pressedLetter === 'ñ'
    ) {
      lettersContainer.innerHTML += `
      <div class="letter-block">${pressedLetter}</div>`

      if (word.includes(pressedLetter)) {
        letters.forEach((letter, index) => {
          if (letter === pressedLetter) {
            blocks[index].textContent = pressedLetter
            countBlocksDone++

            if (countBlocksDone === blocks.length) {
              setTimeout(() => alert('Ganaste!! 🎉🥳😎'), 1)
              location.reload()
            }
          }
        })
      } else {
        draw[indexDraw].classList.remove('hidden')

        if (indexDraw === lifes - 1) {
          setTimeout(() => alert('Perdiste!! 😐😭🙁'), 1)
          location.reload()
        } else {
          indexDraw++
        }
      }
    }
  })
}

initGame()
