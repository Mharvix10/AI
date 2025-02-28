import { useState, useRef } from 'react';
import { HiUpload } from 'react-icons/hi';
import axios from 'axios';

function AudioPage() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioURL(URL.createObjectURL(audioBlob));
        audioChunksRef.current = []; // Clear chunks after saving
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Upload Audio to Server
  const uploadAudio = async () => {
    console.log('uploading')
  };

  return (
    <div className="page">
      <div>
        {/* <img src="" alt="" /> */}
      </div>

      <div className="flex">
        <div>
          {!recording ? (
            <button className="audioBtn" onClick={startRecording}>
              🎤 Start Recording
            </button>
          ) : (
            <button className="audioBtn" onClick={stopRecording}>
              🛑 Stop Recording
            </button>
          )}
        </div>

        {audioURL && (
          <div>
            <audio className="audio" controls>
              <source src={audioURL} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      <div className="mt-1">
        <button disabled onClick={uploadAudio}>
          <HiUpload size={25} />
        </button>
      </div>

      <h3>Audio file is not supported in this version.</h3>
    </div>
  );
}

export default AudioPage;
