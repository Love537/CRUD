import { useState, useEffect } from "react";
import {db} from './fbconfig';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, } from "firebase/firestore";
/////Images de lai imprt kita haa'
import { storage } from "./fbconfig";
import {ref,uploadBytesResumable, getDownloadURL} from '@firebase/storage';

import './Crud.css';
function CRUD()
{
       const[dataName, setDataName] = useState("");
       const[dataDescription, setDataDecription] = useState("");
       const[dataContainment, setDataContainment] = useState("");
    
          //read data lai code 2023/90/13-09-01-59 // use case web hook
       const[readData, setReadData] = useState([]);  // EH map CH KAM KARDA A....
         /// Update record de lai set kite pihla Id te show docs
      const[id, setId] = useState("");
      const[showDoc, setShowDoc] = useState(false);

       // old read
       const ourCollection = collection(db, "data");
       const crudCreat = async () =>{await addDoc(ourCollection,{name:dataName, Description:dataDescription, Containment:dataContainment, imageURL:imageURL}) } 
   
           /////////////////////////////////////////////////////////
    //use effect fungtion
    useEffect( () =>{
      const getData = async () =>{
        const ourDocsToRead = await getDocs(ourCollection);
        setReadData(
          ourDocsToRead.docs.map(
            doc=>({...doc.data(), id:doc.id})
          )
        );
      }
      getData()
    },[ourCollection] );
                /// image de lai  IMAGE FILE CHU LIKIA 20/09/23
                const  [image,setImage] = useState(null);
                 const [imageURL,setImageURL] = useState("");
               //////////////////////////////////////////
      
       //delete data button
          const crudDelete = async(id)=>{
          const docTodelete = doc(db,"data", id);
          await deleteDoc(docTodelete); }

        //add for edit button
        //this will show document/record in main form // UPDATE
        const showEdit = async (id, name, Description,Containment,imageURL )=>{
        setDataName(name);
        setDataDecription(Description);
        setDataContainment(Containment);
        imageURL("")
        setId(id);
        setShowDoc(true);
         }
    

        //UPdate Document That shown in Main form
         const crudUpadate = async () =>{
         const updateData = doc(db, "data", id);
         await updateDoc(updateData,{name:dataName, Description:dataDescription, Containment:dataContainment,imageURL:imageURL});
          setShowDoc(false);
          setDataName("");
          setDataDecription("");
          setDataContainment("");
        }
              //////////////////////////IMAGE LAI///////Image change 
                const handelImageChange =(e) =>{
                                 if(e.target.files[0]){
                                 setImage(e.target.files[0]);  } }

            ////////////////////////////////////////////////////
           /////UPLOAD IMAGE ???///////////////////
              const uploadImage = async ()=>{
               const storageRef = ref(storage,'image'+image.name);
               const uploadTask = uploadBytesResumable(storageRef, image);
               uploadTask.on('state_changed',
               //progress function
               (snapshot)=>{
               const progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
               console.log('upload'+ progress + '%done.');
               },
                 //error fungtion
                 (error) => {console.log(error)},
                 //complete upload retrive URL to upload image
                 async()=>{
                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                 setImageURL(downloadURL);
                }
                );
    }
     ///////////////////////////////////////////////////
     return(
      <>
      <div className="crud-container">
          <input value ={dataName} onChange={(name)=>setDataName(name.target.value)} placeholder="Name"  />
           <br></br>
           <br></br>
         <input value ={dataDescription} onChange={(description)=> setDataDecription(description.target.value)} placeholder="Description"  />
           <br></br>
           <br></br>
         <input value ={dataContainment} onChange={(containment)=> setDataContainment(containment.target.value)} placeholder="Containment"  />
           <br></br>
           <br></br>
       
      <input type ="file" onChange = {handelImageChange}/>
      {""}
     <button onClick={uploadImage}>Upload Image</button>
      <br></br>
     {imageURL && <img src={imageURL} alt="Uploaded Preview" style={{maxWidth: "200px", height: "auto"}} /> }
     <br></br>
     <hr></hr>
     {
     !showDoc?<button className="creat-button" onClick={crudCreat}>Creat new document</button>:
     <button onClick={crudUpadate}>Update Document</button>
      }
     <hr></hr>
     
    {
      readData.map(
        values=>(
          <div key={values.id}>
          <div className="name-feild">
              <h1>{values.name}</h1>
           </div>  
           <div className="Des-Contai">
               <p><strong>Description:</strong>{values.Description}</p>
                <p><strong>Containment:</strong>{values.Containment}</p>
           </div>
                <p>{values.imageURL && <img src={values.imageURL} style={{maxWidth: "200px", height: "auto"}} />}</p> 
              
               <button onClick={()=>crudDelete(values.id)}>Delete</button>
               
                {' '}
                <button onClick={()=>showEdit(values.id,values.name,values.Description,values.Containment, values.imageURL)}>Edit</button>
           

         </div>
        )
      )
     }
     </div>
    </> 

 );
}
export default CRUD;