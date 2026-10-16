import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdventure } from '../lib/adventure.jsx';
import { StudentAvatar } from '../components/AdventureArt.jsx';
import CatCharacter from '../components/CatCharacter.jsx';
import homeImage from '../assets/cat-world/home-empty-perch.png';

export default function PapersPage() {
  const navigate = useNavigate();
  const { fish, equippedShirt, selectedCat, equippedOutfit } = useAdventure();
  const [profileOpen, setProfileOpen] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  function openRoom(destination, event) {
    const stage = event.currentTarget.closest('.reference-stage');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { navigate(`/papers/${destination}`); return; }
    stage.classList.add(`reference-leave--${destination}`);
    window.setTimeout(() => navigate(`/papers/${destination}`), 300);
  }
  return <main className="reference-page">
    <div className="reference-stage reference-stage--home" style={{ backgroundImage: `url(${homeImage})` }}>
      <span className="reference-fish reference-fish--home">{fish}</span>
      <button className="home-cat-button" aria-label="Pet your cat" onClick={(event) => { event.currentTarget.classList.remove('is-petted'); void event.currentTarget.offsetWidth; event.currentTarget.classList.add('is-petted'); }}><CatCharacter cat={selectedCat} outfit={equippedOutfit} /></button>
      {equippedShirt !== 'yellow' && <span className="reference-avatar reference-avatar--home"><StudentAvatar size={110} /></span>}
      <button className="scene-hit scene-hit--profile" aria-label="Open profile" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)} />
      {profileOpen && <div className="reference-profile"><p>Student ID: S001</p><button onClick={() => { setProfileOpen(false); setSignedOut(true); }}>Log out</button></div>}
      <button className="scene-hit scene-hit--badge" aria-label="Learning Badges" onClick={(event) => openRoom('badges', event)} />
      <button className="scene-hit scene-hit--wardrobe" aria-label="Wardrobe" onClick={(event) => openRoom('wardrobe', event)} />
      <button className="scene-hit scene-hit--shop" aria-label="Shop" onClick={(event) => openRoom('shop', event)} />
      <button className="scene-hit scene-hit--math" aria-label="Start Maths Adventure" onClick={() => navigate('/papers/math')} />
      <button className="scene-hit scene-hit--english" aria-label="Start English Adventure" onClick={() => navigate('/papers/english')} />
      {signedOut && <div className="reference-signed-out"><p>Logged out</p><button onClick={() => setSignedOut(false)}>Continue as Student S001</button></div>}
    </div>
  </main>;
}
