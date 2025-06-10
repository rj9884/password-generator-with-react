import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState("8");
  const [numberAllowd, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const genPass = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (numberAllowd) str += "1234567890";
    if (charAllowed) str += "[]{};':!@#$%^&*()_=<>";
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * length + 1);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);

  }, [numberAllowd, charAllowed, length, setPassword]);
  const passRef = useRef(null);
  useEffect(() => {
    genPass()
  }, [numberAllowd, charAllowed, length]);
  const clipToCopy = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  const img = "https://www.dashlane.com/_next/image?url=https%3A%2F%2Fripleyprd.wpengine.com%2Fwp-content%2Fuploads%2F2024%2F05%2FJune-Promo-2024_Landing-page_Graphic.png&w=3840&q=75"
  return (
    <>
      <div style={{background : `url(${img})`}}
      className='bg-cover bg-no-repeat h-screen bg-fixed flex items-center justify-center'>
        <div className='w-full max-w-lg bg-gray-200 text-black mx-auto rounded-lg shadow-lg'>
          <h2 className='text-orange-900 text-center my-5 font-bold text-3xl'>Password Generator</h2>
          <div className='flex rounded-lg mx-4 gap-x-4 outline-none'>
            <div className='w-full bg-gray-300 rounded-lg py-2 px-3 flex items-center shadow-lg'>
              <input type="text" className='bg-gray-400 w-full rounded-lg p-3 backdrop-blur-lg text-black font-bold outline-none'
                value={password} readOnly placeholder="password" ref={passRef} />
            </div>
            <div className='bg-gray-400 rounded-lg py-2 px-2 flex shadow-lg'>
              <button className='outline-none bg-gray-400 p-0-5 shrink-0 rounded-lg font-extrabold text-blue-800 text-2xl cursor-pointer'
                onClick={clipToCopy}>Copy</button>
            </div>
          </div>
          <div className='flex justify-center items-center gap-x-2 my-5 mx-3 p-2 w-full font-bold'>
            <div className='gap-x-4'>
              <input type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => { setLength(e.target.value) }}
                className='cursor-pointer' />
              <label htmlFor="displayText" className='px-1'>{length} : {null}
              </label>
            </div>
            <div className='flex gap-x-1'>
              <input type="checkbox" name="numberAllowed"
                defaultChecked={numberAllowd}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className='cursor-pointer' />
              <label htmlFor="NumberAllowed">NumberAllowed</label>

            </div>
            <div className='flex gap-x-1'>
              <input type="checkbox" name="numberAllowed"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }} 
                className='cursor-pointer'/>
              <label htmlFor="CharAllowed">CharAllowed</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
