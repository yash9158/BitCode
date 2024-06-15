import React from "react";
import '../App.css';
import { useState,useEffect } from "react";
import {NavLink,useNavigate} from 'react-router-dom';

let Home=()=>{
    const navigate=useNavigate();
       const [question,setQuestion]=useState([]);
       let [name,setName]=useState('');
       let [email,setEmail]=useState('');
       let [address,setAddress]=useState('');
       let [college,setCollege]=useState('');
       let [attempted,setAttempted]=useState(0);
       let [solved,setSolved]=useState(0);
       const fun=async ()=>{
        const response=await fetch('/home',{
            method:"GET",
            headers:{
             'Content-Type':'Application/json',
             'Access-Control-Allow-Origin':'*'
            }
        });
        let data=await response.json();
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
        setCollege(data.college);
        setSolved(data.solved);
        setAttempted(data.attempted);
           
        if(data.messageToUser!=''){
        Window.alert(data.messageToUser);
    navigate('/login')}
        let arr=[];
        for(let i in data.history){
          arr.push(i);
        }
        setQuestion(data.history);
       };
       
       useEffect(()=>{
        fun();
      },[]);
    
    return (
       <>
       <div className="container">
    <div className="profile">
        <div className="profile-header">
            <div className="profile-header-cover"></div>
            <div className="profile-header-content">
                <div className="profile-header-img">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                <ul className="profile-header-tab nav nav-tabs nav-tabs-v2">
                    <li className="nav-item">
                        <a href="#profile-post" className="nav-link" data-toggle="tab">
                            <div className="nav-field">Attempted</div>
                            <div className="nav-value">{attempted}</div>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#profile-post" className="nav-link" data-toggle="tab">
                            <div className="nav-field">Solved</div>
                            <div className="nav-value">{solved}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
       
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="desktop-sticky-top">
                    <h4>{name}</h4>
                    <div className="font-weight-600 mb-3 text-muted mt-n2">{email}</div>
                    <div className="mb-1"><i className="fa fa-map-marker-alt fa-fw text-muted"></i> {address}</div>
                    <div className="mb-3"><i className="fa fa-link fa-fw text-muted"></i>{college}</div>
                    <hr className="mt-4 mb-4" />
                </div>
            </div>
           { 
           question.map((val,i)=>
            (
            <div className="profile-content">
            
                <div className="prb">
                    <h4 className="prb1">{val.no}</h4>
                    <h3 className="prb2">{val.name}</h3>
                    <p className="prb3">{val.status}</p>
                </div>
            </div>))
            }
        </div>
    </div>
</div>
       </>
    )
}
export default Home;
