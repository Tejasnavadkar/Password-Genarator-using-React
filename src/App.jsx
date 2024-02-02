import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  let passwordGenerator = useCallback(()=>{
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      
      if (numberallowed) str +="0123456789"
      if (charallowed) str +="!@#$%^&*_+{}~`"

      for (let i=1 ; i <= length ; i++) {
          let char = Math.floor(Math.random()* str.length + 1)
          pass += str.charAt(char) /*concate new characters in pass every iteration */
      }

      setpassword(pass)

  },[length,numberallowed,charallowed,setpassword]) ;/*it takes dependencies in form of array*/

  const copypasswordtoclipboard = useCallback(()=>{
    passwordRef.current?.select() /*here ? for optionally select means to check passwordref null yo nahi */
    passwordRef.current?.setSelectionRange(0,3)/*we can select only some part of passwod */
    window.navigator.clipboard.writeText(password) /*to copy text in clipboard */
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberallowed, charallowed, passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>

      <h1 className='text-white text-center my-3'>Password Generator</h1>
      
     <div className=' flex shadow rounded-lg overflow-hidden mb-4'>

           <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            readOnly
            ref={passwordRef}
            
             />

             <button className='bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md'
             onClick={copypasswordtoclipboard}
             >Copy</button>

      </div>

      <div className='flex text-sm gap-x-2'>
               <div className='flex items-center gap-x-1'>
                <input type='range' min={6} max={100} value={length}
                className='cursor-pointer'
                onChange={(e) => {setlength(e.target.value)}}/>
                <label>Length: {length}</label>
               </div>

               <div className='flex items-center gap-x-1'>
                <input
                   type='checkbox'
                   defaultChecked={numberallowed}
                   id='numberInput'
                   onChange={() => {
                      setnumberallowed((prev)=> !prev);
                   }}
                />
                <label>Numbers</label>
               </div>

               <div className='flex items-center gap-x-1'>
                <input
                   type='checkbox'
                   defaultChecked={charallowed}
                   id='numberInput'
                   onChange={() => {
                      setcharallowed((prev)=> !prev);
                   }}
                />
                <label>Character</label>
               </div>
      
      </div>
     
    </div>

    </>
  )
}

export default App
