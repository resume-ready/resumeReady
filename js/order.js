//get element by id
let form = document.getElementById('form');
let div = document.getElementById('commentsfield');
//let ul = document.getElementById('comment');
let userName = document.getElementById('name');
let feedback = document.getElementById('feedback');
let anonymous = document.getElementById('anonymous');



// array for feedbackes to save them all inside it
let userFeedback = [];
let userIdentify = [];

// function to creat li element
const createLi = function (text1, text2) {
  let header = document.createElement('h3');
  let paragaraph = document.createElement('p');
  header.textContent = `UserName : ${text1}`;
  div.appendChild(header);
  console.log(header);
  paragaraph.textContent = `FeedBack : ${text2}`;
  div.appendChild(paragaraph);
  let pp = document.createElement('p');
  pp.textContent = `--------------------------------------------`;
  div.appendChild(pp);
}


// add event to append the comment on the list
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // local storage  
  if (anonymous.checked) {
    createLi(`anonymous `, feedback.value);
    userIdentify.push('Anonymous');
    userFeedback.push(feedback.value);
    localStorage.setItem('user name', JSON.stringify(userIdentify));
    localStorage.setItem('user feedback', JSON.stringify(userFeedback));
  } else if (userName.value === "") {
    createLi(`no name `, feedback.value);
    userIdentify.push('No Name');
    userFeedback.push(feedback.value);
    localStorage.setItem('user name', JSON.stringify(userIdentify));
    localStorage.setItem('user feedback', JSON.stringify(userFeedback));

  } else {
    createLi(userName.value, feedback.value);
    userIdentify.push(userName.value);
    userFeedback.push(feedback.value);
    localStorage.setItem('user name', JSON.stringify(userIdentify));
    localStorage.setItem('user feedback', JSON.stringify(userFeedback));

  }
})

// get the data from local storage
let feedBackData = JSON.parse(localStorage.getItem('user feedback'));
let userNameData = JSON.parse(localStorage.getItem('user name'));

for (let i = 0; i < feedBackData.length; i++) {
  let header = document.createElement('h3');
  header.textContent = `UserName : ${userNameData[i]}`;
  div.appendChild(header);

  let paragaraph = document.createElement('p');
  paragaraph.textContent = `FeedBack : ${feedBackData[i]}`;
  div.appendChild(paragaraph);
  let pp = document.createElement('p');
  pp.textContent = `--------------------------------------------`;
  div.appendChild(pp);

}

