document.getElementById('submit').onclick = function () {

  // Set a 5 second timeout
  document.getElementById('submit').disabled = true;
  setTimeout(function() {
    document.getElementById('submit').disabled = false;
  }, 5000);
  // Get the user's question
  var question = document.getElementById('question').value;

  // List of possible answers
  var answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Yes.',
    'Signs point to yes.',
    'Outlook good.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
  ];

  // List of possible voices
  var voices = [
    'sound1',
    'sound2',
    'sound3',
    'sound4',
    'sound5',
    'sound6',
    'sound7',
    'sound8',
    'sound9',
    'sound10',
    'sound11',
    'sound12',
    'sound13',
    'sound14',
    'sound15',
    'sound16',
    'sound17',
    'sound18',
    'sound19',
    'sound20'
  ]

  // Generate a random number between 0 and the length of the answers array
  var randomNumber = Math.floor(Math.random() * answers.length);

  // Play the sound
  document.getElementById('eightball-sound').play();

  // Animate the 8Ball
  document.getElementById('eightball').className = 'spinning';

  // Display the answer
  setTimeout(function () {
    document.getElementById('eightball').className = '';
    document.getElementById('answer').innerHTML = answers[randomNumber];
    document.getElementById(voices[randomNumber]).play();
  }, 3000);

};