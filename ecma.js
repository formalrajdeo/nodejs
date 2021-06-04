// 1. Arrow function

// ------ NORMAL FUNCTION ------
// function userName(name) {
//   console.log('Name : ', name)
// }
// userName('rajdeo')

// ------ Arrow FUNCTION ------
// const userName = (name) => {
//   console.log('Name : ', name)
// }
// userName('rajdeo')

// 2. Destructuring Object
const userDATA = { firstname: 'Jhon', lastname: 'Doe' }
const { firstname, lastname } = userDATA
console.log('User DATA : ', firstname)

// 3. Destructure array
const Todos = [
  {
    id: 1,
    name: 'rajdeo',
  },
  {
    id: 2,
    name: 'abc',
  },
]

// Todos.map(({ id, name }) => console.log(id, name))
const [first] = Todos

console.log('Array first position : ', first)

//4. Promise
let addTwoNo = new Promise((resolve, reject) => {
  let a = 1 + 1
  if (a == 2) {
    resolve('success')
  } else {
    reject('Failed')
  }
})
  .then((message) => {
    console.log(message)
  })
  .catch((message) => {
    console.log(message)
  })
