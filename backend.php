<?php
$conn = new mysqli("localhost","root","","todo_db");

if(isset($_REQUEST['action'])){
  $action = $_REQUEST['action'];

  if($action=='add'){
    $task=$_POST['task'];
    $due=$_POST['due'];
    $priority=$_POST['priority'];
    $conn->query("INSERT INTO tasks(task,due,priority) VALUES('$task','$due','$priority')");
  }

  if($action=='list'){
    $filter=$_GET['filter'];
    $sql="SELECT * FROM tasks";

    if($filter=='completed') $sql.=" WHERE completed=1";
    if($filter=='pending') $sql.=" WHERE completed=0";

    $res=$conn->query($sql);
    $data=[];

    while($row=$res->fetch_assoc()){
      $data[]=$row;
    }

    echo json_encode($data);
  }

  if($action=='toggle'){
    $id=$_POST['id'];
    $conn->query("UPDATE tasks SET completed=1-completed WHERE id=$id");
  }

  if($action=='delete'){
    $id=$_POST['id'];
    $conn->query("DELETE FROM tasks WHERE id=$id");
  }

  if($action=='edit'){
    $id=$_POST['id'];
    $task=$_POST['task'];
    $conn->query("UPDATE tasks SET task='$task' WHERE id=$id");
  }
}
?>
