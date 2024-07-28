import React, { useState } from 'react'


import './index.css'
const Qr = () => {
  const [img,setImg]=useState('');
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState('');
  const [size,setSize]=useState("")
  async function generate(){
    setLoading(true);
    try{
      const link=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
      setImg(link)
    }
    catch(error){
      console.log('error occured',error)
    }
    finally{
      setLoading(false)
    }

  }
  function download(){
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        document.body.appendChild(a); // Append the anchor to the body
        a.click();
        document.body.removeChild(a); // Remove the anchor after triggering the download
        window.URL.revokeObjectURL(url); // Clean up the URL object
    })
    .catch((error) => {
        console.error('Error occurred:', error);
    });
}
  return (
    <div className='container'>
        <h1 className='heading'>QR CODE GENERATOR USING REACT</h1>
<label htmlFor='dataInput' className='label-box'>Link to generate QRcode</label>
<input type='text' placeholder='Enter the data' required classname="input-box" value={data} onChange={(e)=>setData(e.target.value)}>

</input>
<label htmlFor='dataInput' className='label-box'>Size of the image</label>
<input type='text' value={size} placeholder='Enter the size(eg.300)' required classname="input-box" onChange={(e)=>setSize(e.target.value)}>
    
</input>
{loading && <p>Please wait while loading...</p>}
{img && <img src={img} className='image'></img>}
<div >
<button className="button one" disabled={loading} onClick={generate}>Generate</button>
<button className="button two"onClick={download}>Download</button></div>
<div className='foot'>
       <p>Designed and Developed by <br></br><a>gayathri</a></p>
   </div>
    </div>
       
  )
}

export default Qr;