// explore.js

window.addEventListener('DOMContentLoaded', init);

const synth = window.speechSynthesis;
let voices = [];

function init() {
  const voiceSelect = document.getElementById('voice-select');
  const textarea = document.getElementById('text-to-speak');
  const button = document.querySelector('button');
  const faceImg = document.querySelector('img[src="assets/images/smiling.png"]');

  populateVoices(voiceSelect);
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => populateVoices(voiceSelect);
  }

  button.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textarea.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (const voice of voices) {
      if (voice.name === selectedOption) {
        utterance.voice = voice;
        break;
      }
    }

    const resetFace = () => {
      faceImg.src = 'assets/images/smiling.png';
    };
    utterance.addEventListener('start', () => {
      faceImg.src = 'assets/images/smiling-open.png';
    });
    utterance.addEventListener('end', resetFace);
    utterance.addEventListener('error', resetFace);

    synth.speak(utterance);
  });
}

function populateVoices(voiceSelect) {
  voices = synth.getVoices();
  // Clear existing dynamic options, preserving the placeholder
  while (voiceSelect.options.length > 1) {
    voiceSelect.remove(1);
  }
  for (const voice of voices) {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      option.textContent += ' -- DEFAULT';
    }
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  }
}
