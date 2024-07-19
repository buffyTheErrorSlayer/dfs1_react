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
    try {
      const res = await getConference(id);
      setConf(res);
    } catch (error) {
      console.error("Can't get conf :", error);
    }
  }


  async function saveConf() {
    try {
      await updateConference(id, conf, token);
      setIsEditMode(false);
      navigate("/admin/conference");
    } catch (error) {
      console.error("Can't save conf :", error);
    }
  }

  

  const bgMainColor = {
    backgroundColor: conf.design?.mainColor ?? "black",
  };

  function handleInputChange(e) {
    console.log(e.target)
    const { name, value } = e.target;
    setConf((prevConf) => ({ ...prevConf, [name]: value }));
}

function handleNestedInputChange(e, index, field, subField) {
    const { value } = e.target;
    setConf((prevConf) => {
      const updatedField = [...prevConf[field]];
      updatedField[index] = { ...updatedField[index], [subField]: value };
      return { ...prevConf, [field]: updatedField };
    });
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
                      <><input type="text"  defaultValue={sp.firstname} onChange={(e) => handleNestedInputChange(e, index, 'speakers', 'firstname')} /> 
                      
                      <input type="text" defaultValue={sp.lastname} onChange={(e) => handleNestedInputChange(e, index, 'speakers', 'lastname')} /></>
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
                      <><input type="text"  defaultValue={sh.firstname}  onChange={(e) => handleNestedInputChange(e, index, 'stakeholders', 'firstname')} /> 
                      
                      <input type="text"  defaultValue={sh.lastname}  onChange={(e) => handleNestedInputChange(e, index, 'stakeholders', 'lastname')}/> 
                      
                      <input type="text" defaultValue={sh.job}  onChange={(e) => handleNestedInputChange(e, index, 'stakeholders', 'job')} /> </>
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
