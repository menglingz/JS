const box = document.querySelector('.box')

function printClass(element) {
  for (let i = 0; i < element.classList.length; i++) {
    console.log(element.classList[i])
  }
}
printClass(box)
box.classList.add('div6')
printClass(box)
