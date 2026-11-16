import React,{useState} from 'react';
function Photo({kind,priority}){
 const[failed,setFailed]=useState(false);
 return <div className="pic">{!failed&&<img className="ok" src={import.meta.env.BASE_URL+'images/'+(priority?'kapadokya-original.jpg':kind+'.webp')} alt="" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" onError={()=>setFailed(true)}/>}</div>;
}
export default function Scene({kind='kapadokya',uid='s'}){return <Photo key={kind} kind={kind} priority={uid==='hero'}/>}
