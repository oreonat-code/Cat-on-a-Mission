import { useNavigate } from 'react-router-dom';
import { papers } from '../data/papers.js';
import AudioButton from '../components/AudioButton.jsx';
import { Fish, SleepingCat } from '../components/art/Art.jsx';
import logo from '../../../design/brand/cty-logo.webp';

const SUBJECT_ART = {
  english: () => (
    <div className="subject-panel subject-panel--english">
      <SleepingCat colour="orange" size={100} />
      <SleepingCat colour="light" size={100} />
      <SleepingCat colour="slate" size={100} />
    </div>
  ),
  math: () => (
    <div className="subject-panel subject-panel--math">
      <div className="fish-group">
        <Fish colour="orange" width={52} height={36} />
        <Fish colour="orange" width={52} height={36} />
        <Fish colour="orange" width={52} height={36} />
      </div>
      <div className="panel-plus" aria-hidden="true">+</div>
      <div className="fish-group">
        <Fish colour="blue" width={52} height={36} />
        <Fish colour="blue" width={52} height={36} />
      </div>
    </div>
  ),
};

export default function PapersPage() {
  const navigate = useNavigate();

  return (
    <main className="canvas">
      <header className="papers-header">
        <img className="logo" src={logo} alt="Catch Them Young" />
      </header>

      <h1 className="papers-title">Papers</h1>
      <p className="papers-subtitle">Pick one to start</p>

      <div className="subject-cards">
        {papers.map((paper) => {
          const Art = SUBJECT_ART[paper.id];
          return (
            <div key={paper.id} className="subject-card-wrap">
              <button type="button" className="subject-card" onClick={() => navigate(`/papers/${paper.id}`)}>
                {Art && <Art />}
                <span className="subject-name">{paper.title}</span>
              </button>
              <AudioButton
                text={paper.title}
                size={56}
                lip={4}
                label={`Listen: ${paper.title}`}
                className="subject-audio"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
