import React from 'react';
import './app.css';
import logo from './logo.svg'
import { PBKDF2, AES, enc } from 'crypto-js';

const salt = 'XB7sHH26Hn&FmPLxnjGccKTfPV(yk';
const patchMasterPassword = (pass) => `${PBKDF2(pass, salt)}(tXntTbJFzh]4EuQVmjzM9GXHCth8`;

function App() {
  const [decodeResult, setDecodeResult] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [backup, setBackupCode] = React.useState('');

  React.useEffect(() => {
    function decode() {
      const psw = patchMasterPassword(password);
      try {
        let stringifyData = AES.decrypt(backup, psw).toString(enc.Utf8);
        console.log(stringifyData)
        if (!stringifyData) {
          throw new Error();
        }

        setDecodeResult(JSON.stringify(JSON.parse(stringifyData), null, 2))
      } catch (ignore) {
        setDecodeResult('Failed decode')
        //
      }
    }
    decode();
  }, [backup, password]);

  function handleChange({ target: { value } }) {
    setBackupCode(value);

  }

  function handlePassword({ target: { value } }) {
    setPassword(value);
  }
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Guarda" className="app-logo"/>
        <span>
          Guarda Backup Decoder
        </span>
      </header>
      <div className="app-wrapper">
        <div>
          <input placeholder='Password' type="password" className="app-input" onChange={handlePassword}/>
          <textarea
            className="app-textarea"
            placeholder={'Enter backup code'}
            onChange={handleChange}
          />
          <br />
          <button className="app-button">Decode</button>
        </div>
        <div className="app-decode-content">
          <span className="app-decode-result">Result:</span>
          {decodeResult}
        </div>
      </div>
    </div>
  );
}

export default App;
