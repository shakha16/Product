let url = "http://localhost:1010"

function getData() {
    axios.get(url + '/users')
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                users(res.data)
            }
        })
}
getData()


let modal = document.querySelector('.modal')
let tovars = document.querySelector('.tovars')
let cancel = document.querySelector('.i')
let inp = document.querySelector('#inp')
let input = document.querySelector('.input')
let done = document.querySelector('.u')


function users(arr) {
    tovars.innerHTML = ""
    for (let item of arr) {
        let div = document.createElement('div')

        let name = document.createElement('span')
        let sale = document.createElement('span')

        div.classList.add('div')

        name = `${item.name}`
        sale = `ㅤㅤㅤㅤㅤㅤㅤ${item.sale}`

        div.append(name, sale)
        tovars.append(div)



        div.onclick = () => {
            modal.style.display = "block"
            inp.placeholder = item.name
            input.placeholder = item.sale
        }
        done.onclick = () => {
            let changed = inp.value
            let change = input.value
            if (inp.value >= 0) {
                alert('Введите данные')
            } else {
                axios.patch(url + '/users/' + item.id, {
                    name: changed,
                    sale: change
                })
                .then(res => {
                    if (res.status == 200 || res.status == 201) {
                        getData()
                    }
                })

                modal.style.display = "none"
            }
        }
    }
}


cancel.onclick = () => {
    modal.style.display = "none"
}