window.onload = function () {
  const list = document.querySelector('#list')

  let comment = document.getElementsByClassName('comment')
  let deleteBtn = document.getElementsByClassName('close')
  let box = document.getElementsByClassName('box')
  let node = document.querySelector('.comment-list').cloneNode(true)

  for (let i = 0; i < deleteBtn.length; i++) {
    box[i].addEventListener('click', function (e) {
      e.preventDefault()
      switch (e.target.className) {
        case 'close':
          list.removeChild(this)
          break
        case 'btn':
          let content = this.querySelector('.comment').value
          let newNode = node.cloneNode(true)
          newNode.querySelector('.comment-praise').setAttribute('total', 0)
          newNode.querySelector('.comment-praise').innerHTML = '0赞'
          newNode.querySelector('.comment-operate').innerHTML = '删除'
          newNode.querySelector('.comment-text').innerHTML = `<span class="user">我：</span>${content}`
          this.querySelector('.content').insertBefore(newNode, this.querySelector('.text-box'))
          this.querySelector('.comment').blur()
          break
        case 'praise':
          this.querySelector('.praise').innerHTML = '已赞'
          this.querySelector('.praises-total').innerHTML = `我和${this.querySelector('.praises-total').innerHTML}`
          this.querySelector('.praise').classList.toggle('isPraise')
          break
        case 'praise isPraise':
          this.querySelector('.praise').innerHTML = '赞'
          this.querySelector('.praises-total').innerHTML = this.querySelector('.praises-total').innerHTML.substr(2)
          this.querySelector('.praise').classList.toggle('isPraise')
          break
        case 'comment-praise':
          let total = e.target.getAttribute('total')
          e.target.setAttribute('total', ++total)
          e.target.innerHTML = `${total}已赞`
          e.target.classList.toggle('isPraise')
          break
        case 'comment-praise isPraise':
          let newTotal = e.target.getAttribute('total')
          e.target.setAttribute('total', --newTotal)
          e.target.innerHTML = `${newTotal}赞`
          e.target.classList.toggle('isPraise')
        case 'comment-operate':
          this.querySelector('.content').removeChild(e.target.parentNode.parentNode.parentNode.parentNode)
          break
      }
    })

    comment[i].addEventListener('focus', function () {
      this.classList.toggle('isFocus')
      toggleStyle(this)
    })

    comment[i].addEventListener('keyup', function (e) {
      if (e.keyCode === 32 || e.keyCode === 8 || e.keyCode === 13) {
        this.nextElementSibling.nextElementSibling.firstElementChild.innerHTML = this.value.length
      }
    })

    comment[i].addEventListener('blur', function () {
      this.classList.toggle('isFocus')
      let that = this
      setTimeout(function () {
        toggleStyle(that)
      }, 100)
    })
  }

  function toggleStyle(ele) {
    if (ele.classList.contains('isFocus')) {
      ele.value = ''
      ele.style.height = '50px'
      ele.nextElementSibling.style.display = 'block'
      ele.nextElementSibling.nextElementSibling.style.display = 'block'
    } else {
      ele.value = '评论…'
      ele.style.height = '20px'
      ele.nextElementSibling.style.display = 'none'
      ele.nextElementSibling.nextElementSibling.style.display = 'none'
    }
  }
}
