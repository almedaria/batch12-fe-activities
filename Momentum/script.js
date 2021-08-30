const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

//Reset
let resetBtn = document.getElementById('reset')
function reset(){
    name.textContent = '';
    focus.textContent = '';
    }
    resetBtn.addEventListener('click', () =>{
    reset();
}); 

// Time
function showTime(){
    // change time (20 is hours) let today = new Date (2021, 06, 10, 12, 33, 30),
        let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes();

//AM or PM
const amPm = hour >= 12 ? ' PM' : ' AM';

//12hr format
hour = hour % 12 || 12;

//Output Time
time.innerHTML= `${hour}<span>:</span>${addZero(min)}<span></span>${amPm}<span></span>`;
setTimeout(showTime,1000)
}

//Add 0
function addZero(n){
    return(parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Background & greeting
function setBgGreet(){
    // change time (20 is hours) let today = new Date ( 2019, 06, 10, 12, 33, 30),
    let today = new Date(),
    hour = today.getHours();

    if (hour < 12){
        greeting.textContent = "Good Morning, ";
        document.body.style.backgroundImage = "url('Images/morning.jpg')";
        document.body.style.color = "#1c3836"; 
        document.getElementById('quote-title').style.color = "#1c3836";
        time.style.color = "#1c3836"; 
        focus.style.color = "#1c3836"; //red
        document.getElementById('reset').style.backgroundColor = "#1c3836";
        document.getElementById('todo').style.backgroundColor = "#1c3836"; 
        document.getElementById('toggle-todo').style.backgroundColor = "#2b7469";


    }else if(hour < 18){
        //Afternoon
        greeting.textContent = "Good Afternoon, ";
        document.body.style.backgroundImage = "url('Images/afternoon.jpg')";
        document.body.style.color = "#ffffff"; 
        document.getElementById('quote-title').style.color = "#421125"; //red
        time.style.color = "#ffffff"; 
        focus.style.color = "#ffffff"; 
        document.getElementById('reset').style.backgroundColor = "#421125"; //red
        document.getElementById('todo').style.backgroundColor = "#421125";
        document.getElementById('toggle-todo').style.backgroundColor = "#943932";
       
        
    }else{
        //Evening
        greeting.textContent = "Good Evening, "
        document.body.style.backgroundImage = "url('Images/evening.jpg')";
        document.body.style.color = "#F2F2F2"; //light grey
        document.getElementById('quote-title').style.color = "#91BFDB"; //light blue //light grey
        time.style.color = "#91BFDB"; //light blue
        focus.style.color = "#F2F2F2"; //light grey
        document.getElementById('reset').style.backgroundColor = '#283859'; //dark blue
        document.getElementById('todo').style.backgroundColor = '#283859'; //dark blue
        document.getElementById('toggle-todo').style.backgroundColor = "#5274A1"; //med blue
    }
}
//Get Name
function getName() {
    if(localStorage.getItem('name') === null){
        name.style.display = null;
              

    }else{
        name.textContent = localStorage.getItem('name');
        name.style.opacity ="1";
    }
}

//Set Name
function setName(e) {
    if (e.type === 'keypress'){
        // make sure if enter is pressed
        if (e.which == 13 || e.keyCode == 13){
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else{
        localStorage.setItem('name', e.target.innerText);
        name.style.opacity ="1";

    }
}

//Get Focus
function getFocus() {
    if(localStorage.getItem('focus') === null){
        focus.style.display = null;
        
       
    }else{
        focus.textContent = localStorage.getItem('focus');
        focus.style.opacity ="1";
    }
}
//Set Name
function setFocus(e) {
    if (e.type === 'keypress'){
        // make sure if enter is pressed
        if (e.which == 13 || e.keyCode == 13){
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
            focus.style.opacity ="1";
        }
    } else{
        localStorage.setItem('focus', e.target.innerText);
        focus.style.opacity ="0.8";
    }
}

//Quote
const quoteText = document.getElementById('quote-text'),
    genQuote = document.getElementById('gen-quote');

function randomQuote(){
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            quoteText.textContent = `"${data.content}"`;
            quoteText.contentEditable = "false";
        });
    }
genQuote.addEventListener('click', () =>{
    randomQuote();
});

const addQuote = document.getElementById('new-quote');
function newQuote(){
    quoteText.textContent = "";
    quoteText.contentEditable = "true";
}
addQuote.addEventListener('click', () =>{
    newQuote();
});


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run
showTime();
setBgGreet();
getName();
getFocus();
randomQuote();
newQuote();


//Todo Aside
let toggleTodoStatus = false;
let getToggle = document.getElementById('toggle-todo');

let toggleTodo = function(){
    let getTodo = document.getElementById('todo');
    let getTodoContent = document.getElementById('todo-content');
    let getTitle = document.getElementById('title-todo');
    

if (toggleTodoStatus === false) {
    getTodo.style.visibility = 'visible';
    getTodo.style.width = '300px';
    getTodoContent.style.visibility ="visible";
    
     
toggleTodoStatus = true; 
}
else if(toggleTodoStatus === true) {
    getTodo.style.visibility = 'visible';
    getTodo.style.width = '50px';
    getTodoContent.style.visibility ="hidden";
    
     
toggleTodoStatus = false; 

}
}
getToggle.addEventListener('click', toggleTodo);

// ToDo JS
document.querySelector('#add').onclick = function(){
    if(document.querySelector('#item input').value.length == 0){
        alert("Please enter a task")
    }
    else{
        document.querySelector('#tasks').innerHTML
        +=`
        <div id="task">
            <span id="taskname">
                ${document.querySelector('#item input').value}
            </span>
            <button class="delete"> 
                
            </button>
        </div>
    `;
}

/*const text = document.getElementById('text');
function addTask(e) {
    if (e.type === 'keypress'){
        if (e.which == 13 || e.keyCode == 13){
            if(document.querySelector('#item input').value.length == 0){
            alert("Please enter a task");
        }
    } else{
            document.querySelector('#tasks').innerHTML
            +=`
            <div id="task">
                <span id="taskname">
                    ${document.querySelector('#item input').value}
                </span>
                <button class="delete"> 
                    
                </button>
            </div>
        `;
    }
    }
}
text.addEventListener('keypress', addTask());*/

    var current_tasks = document.querySelectorAll(".delete");
    for (var i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function(){
            this.parentNode.remove();
        }
    }

    var tasks = document.querySelectorAll("#task")
    for (var i=0; i<tasks.length; i++){
        tasks[i].onclick = function(){
            this.classList.toggle('completed');
        }
    }
document.querySelector("#item input").value = "";
}







 