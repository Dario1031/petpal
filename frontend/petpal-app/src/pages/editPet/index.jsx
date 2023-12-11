import React from 'react';
import Login from '../../components/Login';
import HeaderShelter from '../../components/HeaderShelter';
import FooterShelter from '../../components/FooterShelter';
import PetEditor from '../../components/PetEditor';
import { useNavigate } from "react-router-dom";

const petEditPage = () => {
  // const userString = localStorage.getItem('user');
  // const user = JSON.parse(userString);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user.is_shelter) {
  //     navigate("/petseeker");
  //   }

  // });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderShelter />
            <PetEditor />
        <FooterShelter />
    </div>
  );
};

export default petEditPage;