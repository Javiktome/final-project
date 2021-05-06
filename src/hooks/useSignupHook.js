import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const useSignupHook = (callback) => {
  const [user, setUser] = useContext(UserContext);
  const router = useHistory();
  const [errors, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
  });
  console.log(user, '-------user-----');
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const response = await callback(inputs);
    if (response && response.user?.email) {
      setUser(response.user);
      setError(null);
      router.push('/home');
    } else {
      setUser(null);
      setError(response);
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs(() => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
  };
};
// eslint-disable-next-line import/prefer-default-export
export { useSignupHook };
