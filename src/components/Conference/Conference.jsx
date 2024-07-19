import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getConference, updateConference } from "../../services/conference";

import "./Conference.css";

export function Conference() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [conf, setConf] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const token = localStorage.getItem("token");

  async function getConf() {
    const res = await getConference(id);
    setConf(res);
    console.log(conf)
  }


  async function saveConf()
  {

    const res = await updateConference(id, conf, token);
    getConf()
    setIsEditMode(false)
    navigate("/admin/conference")

  }

  

  const bgMainColor = {
    backgroundColor: conf.design?.mainColor ?? "black",
  };

  function handleInputChange(e) {
    console.log(e.target)
    const { name, value } = e.target;
    setConf((prevConf) => ({ ...prevConf, [name]: value }));
}

  useEffect(() => {
    getConf();
  }, []);

  useEffect(() => {
    if (location.state?.edit) {
      setIsEditMode(true);
    }
  }, [location]);

  return (
    <div className="conf-container">
      <div>
        <div className="cover">
          <img src={conf.img ? conf.img : ""} alt="" />
        </div>
        <div>
          <>
            {isEditMode ? (
              <input type="text" name="title" defaultValue={conf.title} onChange={handleInputChange} />
            ) : (
              conf.title
            )}
          </>
        </div>
        <div className="content mt-3">
          <div className="title" style={bgMainColor}>
            Contenu
          </div>
          <div className="content-text mt-3">
            {isEditMode ? (
              <input type="text" name="content" defaultValue={conf.content} onChange={handleInputChange}/>
            ) : (
              conf.content
            )}
          </div>
        </div>
      </div>
      <div className="info-container">
        <div>
          Date :
          {isEditMode ? (
            <input type="text" name="date" defaultValue={conf.date} onChange={handleInputChange} />
          ) : (
            conf.date
          )}
        </div>
        <div>
          Durée :
          {isEditMode ? (
            <input type="text" name="duration" defaultValue={conf.duration} onChange={handleInputChange} />
          ) : (
            conf.duration
          )}
        </div>
        <div className="title mt-3" style={bgMainColor}>
          Speakers :
        </div>
        <div className="list-container">
          {conf?.speakers?.map((sp, index) => (
            <>
              <div key={sp.id}>
                {
                    isEditMode ? 
                      <><input type="text"  defaultValue={sp.firstname} onChange={handleInputChange} /> 
                      
                      <input type="text" defaultValue={sp.lastname}  onChange={handleInputChange}/></>
                    :
                     <> {sp.firstname} {sp.lastname}</>
                    
                }
              </div>
            </>
          ))}
        </div>

        <div className="title mt-3" style={bgMainColor}>
          Stakeholders :
        </div>
        <div className="list-container">
          {conf?.stakeholders?.map((sh, index) => (
            <>
              <div key={sh.id}>
              {
                    isEditMode ? 
                      <><input type="text"  defaultValue={sh.firstname} onChange={handleInputChange} /> 
                      
                      <input type="text"  defaultValue={sh.lastname} onChange={handleInputChange}/> 
                      
                      <input type="text" defaultValue={sh.job} onChange={handleInputChange} /> </>
                    :
                     <> {sh.firstname} {sh.lastname} - {sh.job} </>
                    
                }
              </div>
            </>
          ))}
          <div>
        {
            isEditMode && <button className="save save-btn" onClick={()=> {saveConf()}}>Enregistrer</button>
        }
      </div>
        </div>
      </div>

      
    </div>
  );
}
