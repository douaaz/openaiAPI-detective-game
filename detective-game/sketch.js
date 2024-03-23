// Machine Learning for Artists and Designers

let img;
let value = 0;
let tval = 0;
let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";
.

let messages = [
  {
    role: "system",
    content: "You are a suspect in a murder. The victim, Sir Edward Harrington, was found dead in his study, a letter opener protruding from his chest. and you, the victim's estranged brother, William Harrington, was found near the scene of the crime, and your hands were covered in blood. You are the prime suspect. the detective is interviewing you to see if you are the murderer, your task is to avoid being caught in a lie. these are the information that the detective publicly about the murder: Time and Date of Murder: The murder occurred on a stormy night, around 11:00 PM on October 3rd. Victim: Sir Edward Harrington, a well-known and wealthy businessman in Ravenswood. He was 55 years old at the time of his death. Cause of Death: The victim was stabbed in the chest with a letter opener, which was found at the scene. You were wearing a black coat. You must start the conversation with: 'Hello, detective' and say 'You caught me, I am guilty' if the detective caught you as the murderer. Remember your task is to not get caught. your responses should be less than 70 words. you can show a contradiction from time to time."
  },
];

function setup() {
  img = loadImage('https://motionarray.imgix.net/preview-922225-EVioGSflaf-high_0000.jpg?w=660&q=60&fit=max&auto=format');
  createCanvas(660, 400);
  
  // whenever the button is clicked, call sendMessage
  select("#submit").mouseClicked(sendMessage);
  
}

function sendMessage() {
  // get the text from the text field
  let content = select("#content").value();
  
  // don't send empty messages to the API
  if (content == "") {
    return;
  }
  
  // add the text to the array of messages
  messages.push({
    role: "user", // this comes from the user
    content: select("#content").value(),
  });

  // clear the textfield
  select("#content").value("");
  
  
  
  // send the request
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);

  // Note: there are additional parameters available, see
  // https://platform.openai.com/docs/api-reference/chat
  //if (tval == 1){
   // showBox();
  //}
}

function gotResults(results) {
  console.log(results);

  // add the first response-choice to the messages array
  messages.push(results.choices[0].message);
  fill(0);
  noStroke();
  textSize(14);
  textWrap(WORD);
  textStyle('italic');
  textFont('Georgia');
  //text(results.choices[0].message.content, 60, 275, 550);
  //tval = 1;
  
}

function draw() {
  background(img);
  fill(190, 181, 160, 230);
  strokeWeight(5);
  stroke(99, 88, 84);
  rect(30, 260, 600, 105);
  showIntro();
  showChatbotMessage();
  
}
function showBox(){
  fill(190, 181, 160, 230);
  strokeWeight(5);
  stroke(99, 88, 84);
  rect(30, 260, 600, 105);
  showNameTag();
}
function showIntro(){
  fill(0);
  noStroke();
  textSize(14);
  textWrap(WORD);
  textStyle('italic');
  textFont('Georgia');
  if (value == 0){
    text("The quiet town of Ravenswood is in shock after the gruesome discovery of a murder in the prestigious Harrington Manor. The victim, Sir Edward Harrington, was found dead in his study, a letter opener protruding from his chest. The town is rife with rumors and speculation, and it's up to you to sift through the lies to uncover the truth.", 60, 275, 550);}else if (value == 1){
     text("The prime suspect is the victim's estranged brother, William Harrington. He was found near the scene of the crime, and his hands were covered in blood. William insists that he's innocent and claims he found his brother dead and tried to help him, but the evidence against him is overwhelming.", 60, 275, 550); 
    }else if (value == 2){
      text("Your task as a detective is to interview William Harrington and determine if he is guilty or not. You must listen carefully to his statements and identify any contradictions in his story. Ask probing questions, pay attention to his reactions, and use your intuition to uncover the truth. Remember, the key to solving this case lies in the details.", 60, 275, 550); 
    } else if (value == 3) {
      text("Are you ready to dive into the dark secrets of Ravenswood and solve the mystery of Sir Edward Harrington's murder? The fate of an innocent man rests in your hands. Don't let the truth slip away. Good luck, detective.", 60, 275, 550); 
    } else {
      showNameTag();
      showNotes();
    }
  
}
function mousePressed(){
  value += 1;
}
function showNameTag(){
  fill(190, 181, 160, 230);
  strokeWeight(5);
  stroke(99, 88, 84);
  rect(40, 250, 190, 30);
  fill(0);
  noStroke();
  textSize(12);
  textWrap(WORD);
  textStyle('italic');
  textFont('Georgia');
  text("Suspect: William Harrington", 45, 265);
}
function showNotes(){
  fill(214, 200, 147);
  square(450, 20, 200, 20);
  textSize(20);
  fill(0);
  text("NOTES", 515, 40);
  textSize(13);
  text("- stormy night, around 11:00 PM on October 3rd.", 460, 60, 180);
  text("- the victim was stabbed twice in the chest with a letter opener", 460, 100, 180);
  text("- the maid saw a man in a black coat running away from the manor.", 460, 155, 180);
}
function showChatbotMessage() {
  fill(0);
  noStroke();
  textSize(14);
  textWrap(WORD);
  textStyle('italic');
  textFont('Georgia');
  // Check if there is a chatbot message and display it
  if (messages.length > 1 && messages.length % 2 == 1) {
    let chatbotMessage = messages[messages.length - 1].content;
    text(chatbotMessage, 60, 285, 550);
  }
}
