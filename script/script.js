const mentalHealthSection = document.getElementById('mental-health');
const financeSection = document.getElementById('financial-literacy');
const homeSection = document.getElementById('home-repair');
const sexedSection = document.getElementById('sex-education');
const cookSection = document.getElementById('cooking');
const disSection = document.getElementById('disaster-preparedness');
const ecoSection = document.getElementById('climate');
const chatSection = document.querySelector('.chatbot button');



mentalHealthSection.addEventListener('click', function() {
  window.location.href = 'pages/mental_health.html'; 
});

financeSection.addEventListener('click', function() {
  window.location.href = 'pages/finance.html'; 
});

homeSection.addEventListener('click', function() {
  window.location.href = 'pages/home.html'; 
});

sexedSection.addEventListener('click', function() {
  window.location.href = 'pages/education.html'; 
});

cookSection.addEventListener('click', function() {
  window.location.href = 'pages/cook.html'; 
});

disSection.addEventListener('click', function() {
  window.location.href = 'pages/disaster.html'; 
});

ecoSection.addEventListener('click', function() {
  window.location.href = 'pages/eco.html'; 
});

chatSection.addEventListener('click', function() {
  window.open('http://localhost:3000', '_blank');
});