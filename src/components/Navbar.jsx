import React from 'react';
import { useNavigate } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { GiPaperBagFolded } from "react-icons/gi";
import { RiRestaurantLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";

const Navbar = () => {

  const navigate = useNavigate();
  const onHome = () => {
    navigate(`/`)
  }

  const onDineIn = () => {
    navigate(`/dine-in`)
  }

  const onDineOut = () => {
    navigate(`/dineout`)
  }

  const onProfile = () => {
    navigate(`/profile`)
  }

  return (
    <div className='NavbarContainer'>
      <div className='NavbarIcon'>
        <IoHomeOutline onClick={onHome} style={{cursor: 'pointer'}}/>
      </div>
      <div className='NavbarIcon'>
        <GiPaperBagFolded onClick={onDineIn} style={{cursor: 'pointer'}}/>
      </div>
      <div className='NavbarIcon'> 
        <RiRestaurantLine onClick={onDineOut} style={{cursor: 'pointer'}}/>
      </div>
      <div className='NavbarIcon'>
        <IoPersonOutline onClick={onProfile} style={{cursor: 'pointer'}}/>
      </div>
    </div>
  );
};

export default Navbar;
