import React from 'react';
import ReactDOM from 'react-dom';

// TODO - move
class SpeechRecognizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (e) => this.onSpeechResult(e);

    this.recognition.onsoundstart = (e) => {
      console.log('soundstart', e);
    };

    this.recognition.onsoundend = (e) => {
      console.log('soundend', e);
    };
  }

  componentDidMount() {
  }

  onSpeechResult(event) {
    console.log(123)
    if(!event) return;
    if(!event.results) return;

    let text = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
    }

    console.log(text);

    this.setState(Object.assign({
      text
    }));
  }

  onClickStart(e) {
     this.recognition.start();
  }

  onClickStop(e) {
    console.log('stop')
     this.recognition.stop();
  }

  render() {
    return (
      <div>
        <button onClick={e => this.onClickStart(e)}>Start</button>
        <button onClick={e => this.onClickStop(e)}>Stop</button>

        <textarea val={this.state.text}></textarea>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
}

const App = () => (
  <div>
    <SpeechRecognizer />
  </div>
);

const boostrap = () => {
  const root = document.querySelector('body');
  const app = document.createElement('div');
  root.appendChild(app);

  ReactDOM.render(<App />,  app);
};

boostrap();
