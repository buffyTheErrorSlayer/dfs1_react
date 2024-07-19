import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getConference, addConference, updateConference } from '../../services/conference';

export function ConferenceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conf, setConf] = useState({
    title: '',
    content: '',
    description: '',
    date: '',
    duration: '',
    img: '',
    design: {
      mainColor: '#000', 
      secondColor : '#000'
    },
    speakers: [{ firstname: '', lastname: '' }],
    stakeholders: [{ firstname: '', lastname: '', job: '' }]
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConf({ ...conf, [name]: value });
  };

  const handleNestedInputChange = (e, index, field, subField) => {
    const { value } = e.target;
    setConf((prevConf) => {
      const updatedField = [...prevConf[field]];
      updatedField[index] = { ...updatedField[index], [subField]: value };
      return { ...prevConf, [field]: updatedField };
    });
  };

  const addNestedField = (field) => {
    setConf((prevConf) => ({
      ...prevConf,
      [field]: [...prevConf[field], field === 'speakers' ? { firstname: '', lastname: '' } : { firstname: '', lastname: '', job: '' }]
    }));
  };

  const removeNestedField = (field, index) => {
    setConf((prevConf) => {
      const updatedField = [...prevConf[field]];
      updatedField.splice(index, 1);
      return { ...prevConf, [field]: updatedField };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
        await addConference(conf, token);
        navigate('/admin/conference');
    } catch (error) {
      console.error('Error saving conference:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="conference-form">
      <div>
        <label>Titre:</label>
        <input type="text" name="title" value={conf.title} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={conf.description} onChange={handleInputChange} required></textarea>
      </div>
      <div>
        <label>Contenu:</label>
        <textarea name="content" value={conf.content} onChange={handleInputChange} required></textarea>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={conf.date} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Durée:</label>
        <input type="text" name="duration" value={conf.duration} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="img" value={conf.img} onChange={handleInputChange} />
      </div>
      <div>
        <label>Couleur principale:</label>
        <input type="color" name="design.mainColor" value={conf.design.mainColor} onChange={handleInputChange} />
      </div>
      <div>
        <label>Couleur principale:</label>
        <input type="color" name="design.secondColor" value={conf.design.secondColor} onChange={handleInputChange} />
      </div>
      <div>
        <label>Speakers:</label>
        {conf.speakers.map((sp, index) => (
          <div key={index} className="nested-field">
            <input
              type="text"
              placeholder="Prénom"
              value={sp.firstname}
              onChange={(e) => handleNestedInputChange(e, index, 'speakers', 'firstname')}
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={sp.lastname}
              onChange={(e) => handleNestedInputChange(e, index, 'speakers', 'lastname')}
              required
            />
            <button type="button" className='delete' onClick={() => removeNestedField('speakers', index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" className='default' onClick={() => addNestedField('speakers')}>
          Ajouter un speaker
        </button>
      </div>
      <div>
        <label>Stakeholders:</label>
        {conf.stakeholders.map((sh, index) => (
          <div key={index} className="nested-field">
            <input
              type="text"
              placeholder="Prénom"
              value={sh.firstname}
              onChange={(e) => handleNestedInputChange(e, index, 'stakeholders', 'firstname')}
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={sh.lastname}
              onChange={(e) => handleNestedInputChange(e, index, 'stakeholders', 'lastname')}
              required
            />
            <input
              type="text"
              placeholder="Job"
              value={sh.job}
              onChange={(e) => handleNestedInputChange(e, index, 'stakeholders', 'job')}
              required
            />
            <button type="button" className='delete' onClick={() => removeNestedField('stakeholders', index)}>
              Supprimer
            </button>
          </div>
        ))}
        <button type="button"className='default' onClick={() => addNestedField('stakeholders')}>
          Ajouter un stakeholder
        </button>
      </div>
      <button className='save' type="submit">Créer</button>
    </form>
  );
}
