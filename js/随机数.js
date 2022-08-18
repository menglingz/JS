function getRandomNumber(num1, num2) {
  let total_num = num2 - num1 + 1
  return Math.floor(Math.random() * total_num + num1)
}
