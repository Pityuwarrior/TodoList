const URL = 'http://localhost:3000/tasks/'
import { getData } from "./form"

let dragedTaskId
const parentDrag = document.querySelector('.tasks-list')
parentDrag.addEventListener('dragstart', (event) => {
    if(event.target.matches('.tasks-list-inner')){    
        const draggable = event.target.closest('.tasks-list-inner')
        dragedTaskId = draggable.dataset.id
        draggable.classList.add('dragging');
        console.log('drag')
        console.log(dragedTaskId)
    }
})

let dropedTaskId
parentDrag.addEventListener('dragover', (event) => {
    event.preventDefault()
    if(event.target.matches('.tasks-list-inner')){    
        const draggable = event.target.closest('.tasks-list-inner')
        dropedTaskId = draggable.dataset.id
        console.log('dragover')
        console.log(dropedTaskId)
    }

})

parentDrag.addEventListener('dragend', async (event) => {
    if(event.target.matches('.tasks-list-inner')){    
        const draggable = event.target.closest('.tasks-list-inner')
        draggable.classList.remove('dragging');
        console.log('dragend')
        if(dragedTaskId != dropedTaskId){
            const dragfetch1 = await fetch(`${URL}id/${dropedTaskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  dataid: 0
                })
            })
            const post1 = await dragfetch1.json()
            console.log("post1");
            console.log(post1)
            
            const dragfetch2 = await fetch(`${URL}id/${dragedTaskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  dataid: dropedTaskId
                })
            })
            const post2 = await dragfetch2.json()
            console.log("post2");
            console.log(post2)

            const dragfetch3 = await fetch(`${URL}id/${0}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  dataid: dragedTaskId
                })
            })
            const post3 = await dragfetch3.json()
            console.log("post3");
            console.log(post3)

            getData()  
        }
    }
})


