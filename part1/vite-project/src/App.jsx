import React, { useState } from 'react';

// Componente Header
const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

// Componente Content
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

// Componente Total
const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

// Componente Statistics
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr><td>Good:</td><td>{good}</td></tr>
          <tr><td>Neutral:</td><td>{neutral}</td></tr>
          <tr><td>Bad:</td><td>{bad}</td></tr>
          <tr><td>Total:</td><td>{total}</td></tr>
          <tr><td>Average:</td><td>{average}</td></tr>
          <tr><td>Positive Percentage:</td><td>{positivePercentage}%</td></tr>
        </tbody>
      </table>
    </div>
  );
};

// Componente Button
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// Componente App
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  };

  // Anécdotas
  const jokes = [
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "I used to play piano by ear, but now I use my hands.",
    "My dog used to chase people on a bike a lot. It got so bad, I had to take his bike away.",
    "Did you hear about the claustrophobic astronaut? He just needed a little space.",
    "I'm trying to organize a hide-and-seek tournament, but it's tough to find good players.",
    "I asked the librarian if they had any books on paranoia. She whispered, 'They're right behind you.'",
    "I told my computer I needed a break, but it refused. It had too many tabs open!"
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(jokes.length).fill(0));

  const handleNextJokes = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  const mostVotedIndex = votes.indexOf(Math.max(...votes));
  const mostVotedJokes = jokes[mostVotedIndex];

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
      <div>
        <h2>Feedback</h2>
        <Button handleClick={handleGoodClick} text="Good" />
        <Button handleClick={handleNeutralClick} text="Neutral" />
        <Button handleClick={handleBadClick} text="Bad" />
      </div>
      <div>
        <h2>Joke of the day</h2>
        <div>{jokes[selected]}</div>
        <p>Has {votes[selected]} votes</p>
        <Button handleClick={handleVote} text="Vote" />
        <Button handleClick={handleNextJokes} text="Next Joke" />
      </div>

      {(good || neutral || bad) && <Statistics good={good} neutral={neutral} bad={bad} />}

      <div>
        <h2>Most Voted Joke</h2>
        <div>{mostVotedJokes}</div>
        <p>Has {votes[mostVotedIndex]} votes</p>
      </div>
    </div>
  );
};

export default App;
