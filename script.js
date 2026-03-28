function addTask(){
 fetch('backend.php',{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:`action=add&task=${task}&due=${due}&priority=${priority}`
 }).then(()=>loadTasks());
}

function loadTasks(){
 let filter=document.getElementById('filter').value;
 fetch('backend.php?action=list&filter='+filter)
 .then(res=>res.json())
 .then(data=>{
  let html='';
  data.forEach(t=>{
    html+=`<div class="task ${t.completed==1?'completed':''}">
      <span onclick="toggle(${t.id})">${t.task} (${t.priority})</span>
      <div>
        <button onclick="editTask(${t.id})">Edit</button>
        <button onclick="del(${t.id})">X</button>
      </div>
    </div>`;
  });
  document.getElementById('tasks').innerHTML=html;
 });
}

function toggle(id){
 fetch('backend.php',{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:`action=toggle&id=${id}`
 }).then(()=>loadTasks());
}

function del(id){
 fetch('backend.php',{
  method:'POST',
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  body:`action=delete&id=${id}`
 }).then(()=>loadTasks());
}

function editTask(id){
 let newTask=prompt('Edit task:');
 if(newTask){
  fetch('backend.php',{
   method:'POST',
   headers:{'Content-Type':'application/x-www-form-urlencoded'},
   body:`action=edit&id=${id}&task=${newTask}`
  }).then(()=>loadTasks());
 }
}

loadTasks();
