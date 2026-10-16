import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdventure } from '../lib/adventure.jsx';
import { useLogOut, useSession } from '../auth/session.jsx';
import { StudentAvatar } from '../components/AdventureArt.jsx';
import CatCharacter from '../components/CatCharacter.jsx';
import homeImage from '../assets/cat-world/home-empty-perch-2x.webp';

export default function PapersPage() {
  const navigate = useNavigate();
  const { fish, equippedShirt, selectedCat, equippedOutfit } = useAdventure();
  const [profileOpen, setProfileOpen] = useState(false);
  const { session } = useSession();
  const logOut = useLogOut();
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
      {profileOpen && <div className="reference-profile"><p>Student ID: {session.id}</p><button onClick={logOut}>Log out</button></div>}
      <button className="scene-hit scene-hit--badge" aria-label="Learning Badges" onClick={(event) => openRoom('badges', event)} />
      <button className="scene-hit scene-hit--wardrobe" aria-label="Wardrobe" onClick={(event) => openRoom('wardrobe', event)} />
      <button className="scene-hit scene-hit--shop" aria-label="Shop" onClick={(event) => openRoom('shop', event)} />
      <button className="scene-hit scene-hit--math" aria-label="Start Maths Adventure" onClick={() => navigate('/papers/math')} />
      <button className="scene-hit scene-hit--english" aria-label="Start English Adventure" onClick={() => navigate('/papers/english')} />
    </div>
  </main>;
}
