import React, { useState } from 'react';
import Select from 'react-select';
import { FormInput } from '../../../../../components';

const SelectContratista = (props) => {
  const [items, setItems] = useState([{ contratista: '' }]);
  const [showInput, setShowInput] = useState(false);
  const [otroValor, setOtroValor] = useState('');

  const handleSelectChange = (selectedOption) => {
    setItems([{ ...props.items, contratista: selectedOption.label }]);
    if (selectedOption.id === 3) {
      setShowInput(true);
    } else {
      setShowInput(false);
      setOtroValor('');
    }
  };

  const handleInputChange = (e) => {
    setOtroValor(e.target.value);
    setItems([{ ...props.items, contratista: e.target.value }]);
  };

  const options = [
    { id: 0, label: 'Seleccione el contratista...' },
    { id: 1, label: 'SI' },
    { id: 2, label: 'NO' },
    { id: 3, label: 'OTRO ¿CUAL' },
  ];

  return (
    <div>
      <Select
        type="select"
        name="contratista"
        className="react-select"
        classNamePrefix="react-select"
        onChange={handleSelectChange}
        options={options}
        placeholder="Seleccione el contratista..."
        value={options.find(option => option.label === items[0].contratista)}
      />
      {showInput && (
         <FormInput
         label={'Digite el otro tipo'}
         type="textarea"
         rows="2"
         name="nombresApellidos"
         value={otroValor}
         onChange={handleInputChange}
         placeholder={'Especifique otro valor'}
         containerClass={'mb-3'}
     />
      )}
    </div>
  );
};

export default SelectContratista;
