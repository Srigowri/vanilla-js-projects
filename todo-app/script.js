const form = document.getElementById('form');
const input  = document.getElementById('input');
const todos = document.getElementById('todos');

const todo_list = JSON.parse(localStorage.getItem('todo_list'));
if (todo_list){
    for(let i =0;i<todo_list.length;i++){
        const element= document.createElement('li')
        element.innerText = todo_list[i]['text'];
        if(todo_list[i]['completed']){
            element.classList.add('completed');
        }
        element.addEventListener('click',()=>{
            element.classList.toggle('completed');
            updateLS();
        }); 
        element.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            element.remove();
            updateLS();

        })
        todos.appendChild(element);
        input.value = '';
        updateLS();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addToDo();
});
function updateLS(){
    const todoel = document.querySelectorAll('li');
    const todo_list = [];
    todoel.forEach((todo)=>{                
        todo_list.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        });
    });
    localStorage.setItem('todo_list',JSON.stringify(todo_list));
}
function addToDo(){
    const todo = input.value;    
    if (todo){
        const element= document.createElement('li')
        element.innerText = todo;
        element.addEventListener('click',()=>{
            element.classList.toggle('completed');
            updateLS();
        }); 
        element.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            element.remove();
            updateLS();

        })
        todos.appendChild(element);
        input.value = '';
        updateLS();
    }
}