import React, { useEffect } from 'react';
import "../../App.css";
import { useState } from 'react';
import { q } from './Problems';
import {Submit} from './Submit';
const Problem = (props) => {
  const [question,setQuestion] = useState({});
  const [input,setInput]=useState([0]);
  const [output,setOutput]=useState([0]);
  const ques = async () => { 

    let val={no:q};
    try {
       
      const res = await fetch("/sendq", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body:JSON.stringify(val)
      });

      const data = await res.json();
      console.log(data);
      setQuestion(data);
    setInput(data.input);
    setOutput(data.output);
      if(!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch {
      console.log("error");
    }
  }
  
  useEffect(() => {
   ques();
  },[])

  return (
    
    <div id="id1">
        <div className = "div1">
            <label></label>
          <h2 id = "h2"><pre>{question.question_id}. {question.question_title}</pre></h2>
          <div id = "question area">
           {question.question_description}
          </div>
          
          <div className='input'>
                <label>INPUT:</label>
                <pre>{question.input_description}</pre>
          </div>
          <label>CONSTRAINTS:</label>
                <div id = "constraints">
                <pre>{question.constraints}</pre>
                </div>
          <label >OUTPUT:</label>
                <div >
                <pre>{question.output_description}</pre>
                </div>
          <label>Sample Input</label>
                <div id = "input1">
                <pre>{input[0]}</pre>
                </div>
          <label>Sample Output</label>
                <div id = "output1">
                <pre>
                {output[0]}
                </pre>
                 </div>
         </div>
         <Submit p1={q} p2={input[1]}/>
    </div>
  )
}


export default Problem