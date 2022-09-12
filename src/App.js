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
  const [Error2, setError2] = useState(false)
  const [Loading1, setLoading1] = useState(false)
  const [Loading2, setLoading2] = useState(false)
  const validateTweet = new RegExp(/((https?):\/\/)?(www.)?twitter\.com(\/@?(\w){1,15})\/status\/[0-9]{19}\?/);
  const twit = "https://twitter.com/Bucketboynft/status/1567856688891305987?s=20&t=sx7CRSCGWtigalq5ZFGN7Q"
  const twit2 = "#BucketboyNFT https://t.co/hTYX2lzl9q";
  const height = window.innerHeight;


  
  useEffect(()=>{
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
    setLoading1(true)
    fetch('https://bucketboy.onrender.com/gettweet',{
      method:'POST',
      headers:{
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: `${id}`
      })     
    }).then(response => response.json())
    .then((data) =>{if(data.data.text === twit2){
      setStep(2);
      setButValid(false)
      setNextValid(true)
      setLoading1(false)
    }else{setError1(true);setLoading1(false)}
  })
  }

  const handleTweetClick = ()=>{
    window.open(`https://twitter.com/intent/tweet?hashtags=BucketboyNFT&text=${twit}`,'_blank')
  }

  const handleFollowClick = ()=>{
    window.open('https://twitter.com/Bucketboynft?s=20&t=0Gl2xIonLpbchxKCVJ7xDQ','_blank')
  }

  const handleFollow = ()=>{
    setLoading2(true)
    fetch('https://bucketboy.onrender.com/getfollowers',{
      method:'POST',
      headers:{
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: '1536787378861383680'
      })
    }).then(response => response.json())
    .then((data) => {
      for(let i = 0; i < data.data.length; i++){
        if(i === (data.data.length - 1) && Loading2 === true){
          setLoading2(false)
          setError2(true)
        }
        if(data.data[i].username === username){
          setLoading2(false)
          window.open("https://discord.gg/SVybaRPV", '_blank')
          setError2(false)
        }
        else{
          continue
        }
      }
    })
  }

  return (
    <div className="App" style={{height:height + 'px'}}>
      <div className='Images'>
        <img className='first' src='https://cdn.discordapp.com/attachments/1013804888385404979/1013805249330430072/bucket_head4.png' alt='BucketBoy Text'/>
        <img className='second' src='https://cdn.discordapp.com/attachments/1013804888385404979/1013805249665966130/Bucket_water_mark_1.png' alt='BucketBoy Bucket'/>
      </div>
      <div className='Forms'>
        <h2>Follow these steps to join the discord server.</h2>
        <h3>The below steps are important to authenticate users in our community. Please complete them all to verify your role within our discord.</h3>
        <div className={step === 1 ? 'form1 show' : 'form1'}>
          <button disabled={step === 1 ? false : true} className='tweetButton' onClick={handleTweetClick}>Tweet</button>
          <input disabled={step === 1 ? false : true} placeholder='Enter tweet link'  name='TweetLink' onChange={handleChange}></input>
          <button disabled={nextValid} onClick={handleClick} className="Next">{Loading1? "↻" : "Next"}</button>
          <p className={Error1? "error show1" : "error"}>This is not a valid tweet</p>
        </div>
        <div className={step === 2 ? 'form2 show' : 'form2'}>
            <h3>Follow this account</h3>
            <button disabled={butValid} onClick={handleFollowClick}>Follow</button>
            <button disabled={butValid} onClick={handleFollow}>{Loading2? "↻" : "Click Here to Join"}</button>
            <p className={Error2? "error show1" : "error"}>Ensure you followed the account</p>
        </div>
      </div>
    </div>
  );
}

export default App;
