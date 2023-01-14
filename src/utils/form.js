const URL = 'http://localhost:3000/tasks/'

export function getData(){
  const taskList = document.querySelector('.tasks-list')
  const templateTask = document.querySelector('#templateTask')
  fetch(URL)
  .then(response => response.json())
  .then(data => {
    if(data.length > 0){
      taskList.style.display = 'flex'
      taskList.innerHTML = ''
      data.forEach(item => {
        const task = templateTask.content.cloneNode(true)
        task.querySelector('.tasks-list-inner').dataset.id = item.id
        task.querySelector('.task-checkbox').checked = item.done  
        task.querySelector('.task-text').value = item.tasks
        taskList.appendChild(task)
      })  
    }else {
      taskList.style.display = ''
    }
  })
}
getData()


// Post fetch for the API
document.querySelector('.new-task').addEventListener('submit', async (event) => {
  event.preventDefault()
  const taskInput = document.querySelector('.new-task-input')
  const task = taskInput.value
  taskInput.value = ""
  const addTask = await fetch(URL, {
    method: 'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify({
        tasks: task,
        done: false
    })
  })
  const postData = await addTask.json()
  console.log(postData)
  getData()
})


const parentChecked = document.querySelector('.tasks-list')
parentChecked.addEventListener('click', async (event) => {
  if(event.target.matches('.task-checkbox')){
    const innerEl = event.target.closest('.tasks-list-inner')
    const taskId = innerEl.dataset.id
    const isChecked = event.target.checked
    console.log(isChecked)
    const checkTask = await fetch(`${URL}done/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        done: isChecked
      })
    }) 
    const postData = await checkTask.json()
    console.log(postData)   
    console.log('check')
    getData()
  } 
})


const parentEdit = document.querySelector('.tasks-list')
parentEdit.addEventListener('click', (event) => {
  event.preventDefault()
  if(event.target.matches('.edit')){
    const innerEl = event.target.closest('.tasks-list-inner')
    const taskText = innerEl.querySelector('.task-text')
    const taskEdit = innerEl.querySelector('.edit')
    const taskId = innerEl.dataset.id
    if (taskText.readOnly){
      taskEdit.style.color = "aqua"
      beforeEditText = taskText.value
      taskText.readOnly = false
      console.log(beforeEditText)
      console.log(taskText.value)
    }else{
      taskText.readOnly = true
      taskEdit.style.color = "rgb(235, 235, 235)"
      if(beforeEditText != taskText.value){
        fetch(`${URL}task/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          tasks: taskText.value
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.status === "Success") {
              console.log("Task updated successfully")
              getData();
            } else {
              console.log("Failed to update task: " + data.reason)
            }
          })
          .catch(error => console.log("Error: " + error))
      }
    }
  }
})

const parentDelete = document.querySelector('.tasks-list')
parentDelete.addEventListener('click', (event) => {
  event.preventDefault()
  if(event.target.matches('.delete')){
    const innerEl = event.target.closest('.tasks-list-inner')
    const taskId = innerEl.dataset.id
    fetch(`${URL}/${taskId}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === "Success") {
          console.log("Task was deleted successfully")
          getData()
        } else {
          console.log("Failed to delete task: " + data.reason)
        }
    })
    .catch(error => console.log("Error: " + error))
  }
})

