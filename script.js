let url = "http://localhost:3001"
let id

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

        name.innerHTML = item.name
        sale.innerHTML = item.sale

        div.append(name, sale)
        tovars.append(div)



        div.onclick = () => {
            modal.style.display = "block"
            inp.placeholder = item.name
            input.placeholder = item.sale
            id = item.id
        }
        done.onclick = () => {
            let changed = inp.value
            let change = input.value
            if (inp.value.length <= 0) {
                alert('Введите данные')
            } else {
                console.log(item.id);
                axios.patch(url + '/users/' + id, {
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