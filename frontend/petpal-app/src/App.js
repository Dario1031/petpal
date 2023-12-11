import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import loginPage from './pages/Login/index';
import registerPage from './pages/Register/index';
import petCreationPage from './pages/petCreation/index';
import editProfilePage from './pages/editProfile';
import ShelterInfoPage from './pages/shelterInfo';
import PetSeekerPage from './pages/petSeeker';
import ChatPage from './pages/chat';
import notFoundPage from './pages/notFound';
import ShelterCardPage from './pages/shelterList';
import ApplicationsPage from './pages/Applications';
import petEditPage from './pages/editPet';
import petApplyPage from  './pages/petApply';
import ShelterPetsPage from './pages/ShelterPets';
import ShelterApplicationsPage from './pages/ShelterApplications';
import ShelterUpdateStatusPage from './pages/shelterUpdateStatus';
import PetSeekerApplicationsPage from './pages/petSeekerApplications';
import PetSeekerUpdateStatusPage from './pages/petSeekerUpdateStatus';
import ChatDirectoryPage from './pages/chatDirectory';
import NotifPage from './pages/notifs';

const App = () => {
return (
  <div>
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index Component={registerPage} />
            <Route path="login" Component={loginPage} />
            <Route path="petcreation" Component={petCreationPage} />
            <Route path="profile" Component={editProfilePage} />
            <Route path="shelter/:shelterId" Component={ShelterInfoPage} />
            <Route path="petseeker" Component={PetSeekerPage} />
            <Route path="editpet/:petId" Component={petEditPage} />
            <Route path="chat/:chatNumber" Component={ChatPage} />
            <Route path="chats" Component={ChatDirectoryPage} />
            <Route path="shelterlist" Component={ShelterCardPage} />
            {/* <Route path="applications" Component={ApplicationsPage} /> */}
            <Route path="apply/:petId" Component={petApplyPage} />
            <Route path='shelterpets' Component={ShelterPetsPage}/>
            <Route path='petapplications/:petId' Component={ShelterApplicationsPage}/>
            <Route path='shelterupdate/:appId' Component={ShelterUpdateStatusPage}/>
            <Route path='myapplications' Component={PetSeekerApplicationsPage}/>
            <Route path='/petseekerupdate/:appId' Component={PetSeekerUpdateStatusPage}/>
            <Route path='/notifs' Component={NotifPage} />
            <Route path="*" Component={notFoundPage} />
          </Route>
        </Routes>
    </BrowserRouter>
  </div>
);
};

export default App;
