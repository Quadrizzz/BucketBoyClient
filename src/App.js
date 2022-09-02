import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [tweet, setTweetLink]= useState("");
  const [id, setTweetId] = useState("");
  const [validTweet, setValidTweet] = useState(false)
  const [step, setStep] = useState(1);
  const[nextValid, setNextValid] = useState(true);
  const [butValid, setButValid] = useState(true)
  const [Error1, setError1] = useState(false)
  const validateTweet = new RegExp(/((https?):\/\/)?(www.)?twitter\.com(\/@?(\w){1,15})\/status\/[0-9]{19}\?/);
  const token = "AAAAAAAAAAAAAAAAAAAAAH%2FpgQEAAAAAOeUVljoK7fFyhzljKOQmKRG9MHU%3DehQiyRP2VCiW6UyMOSiw6lDir3lMzrZb6145JdGmuGPHYRP0nv";
  const twit = "This is a test twit"
  const height = window.innerHeight;


  
  useEffect(()=>{
    console.log(validTweet)
    console.log(tweet)
    let slash = 0;
    let user_id = '';
    let tweet_id = '';
    

    for(let i = 0; i < tweet.length; i++){
      if(tweet[i] === '/'){
        slash = slash +  1;
      }
      if(slash === 3 && slash < 4){
        if(tweet[i] !== '/'){
          user_id = user_id + tweet[i];
        }
      }
      if(slash === 5 && tweet[i] !== '?'){
        if(tweet[i] !== '/'){
          tweet_id = tweet_id + tweet[i];
        }
      }
      if(tweet[i] === '?'){
        break
      }
    }
    setUsername(user_id);
    setTweetId(tweet_id);

  },[tweet,validTweet])



  const handleChange = (e)=>{
    setTweetLink(e.target.value)
    if(validateTweet.test(e.target.value)){
      setValidTweet(true);
      setNextValid(false);
    }
  }

  const handleClick = ()=>{
    fetch('http://localhost:3001/gettweet',{
      method:'POST',
      headers:{
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: `${id}`
      })     
    }).then(response => response.json())
    .then((data) =>{if(data.data.text === twit){
      setStep(2);
      setButValid(false)
      setNextValid(true)
    }else{setError1(true)}
  })
  }

  const handleTweetClick = ()=>{
    window.open(`https://twitter.com/intent/tweet?text=${twit}`,'_blank')
  }

  const handleFollow = ()=>{
    fetch('http://localhost:3001/getfollowers',{
      method:'POST',
      headers:{
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '882932059022385152'
      })
    }).then(response => response.json())
    .then((data) => {console.log(data.data)})
  }

  return (
    <div className="App" style={{height:height + 'px'}}>
      <div className='Images'>
        <img className='first' src='https://cdn.discordapp.com/attachments/1013804888385404979/1013805249330430072/bucket_head4.png'/>
        <img className='second' src='https://cdn.discordapp.com/attachments/1013804888385404979/1013805249665966130/Bucket_water_mark_1.png'/>
      </div>
      <div className='Forms'>
        <h2>Follow these steps to join the discord server.</h2>
        <div className={step === 1 ? 'form1 show' : 'form1'}>
          <button disabled={step === 1 ? false : true} className='tweetButton' onClick={handleTweetClick}>Tweet</button>
          <input disabled={step === 1 ? false : true} placeholder='Enter tweet link'  name='TweetLink' onChange={handleChange}></input>
          <button disabled={nextValid} onClick={handleClick} className="Next">Next</button>
          <p className={Error1? "error show1" : "error"}>This is not a valid tweet</p>
        </div>
        <div className={step === 2 ? 'form2 show' : 'form2'}>
            <h3>Follow this account</h3>
            <button disabled={butValid}>Follow</button>
            <button disabled={butValid} onClick={handleFollow}>Click here to join</button>
        </div>
      </div>
    </div>
  );
}

export default App;
