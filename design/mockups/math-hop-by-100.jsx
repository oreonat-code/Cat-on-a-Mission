/**
 * from Paper
 * https://app.paper.design/file/01M4ZZ4H5QTRMC6V3GMQE17RSE/01K4GP58P8JRM8PGBP0586VKYV/J3-0
 * on Oct 16, 2026
 *
 * Notes for the build: the hint line is not built (no hints in the app), and the hop arcs are
 * redrawn between the real card centres (the exported arcs are spaced 190px, the cards ~221px).
 */
export default function () {
  return (
    <div style={{ backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', fontSize: '12px', fontSynthesis: 'none', height: '900px', lineHeight: '16px', MozOsxFontSmoothing: 'grayscale', overflow: 'clip', overflowWrap: 'anywhere', WebkitFontSmoothing: 'antialiased', width: '1440px' }}>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '28px', paddingBlock: '32px', paddingInline: '80px' }}>
        <div style={{ alignItems: 'center', backgroundColor: '#EEF1F6', borderRadius: '26px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '52px', justifyContent: 'center', width: '52px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', flexShrink: '0' }}>
            <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="#12263F" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ backgroundColor: '#EEF1F6', borderRadius: '10px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexGrow: '1', height: '20px' }}>
          <div style={{ backgroundColor: '#2557D6', borderRadius: '10px', boxSizing: 'border-box', height: '20px', width: 'round(40%, 1px)' }} />
        </div>
        <div style={{ alignItems: 'center', backgroundColor: '#FFF3CC', borderRadius: '999px', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingBlock: '10px', paddingInline: '20px' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', flexShrink: '0' }}>
            <polygon points="12,2 15,9 22,9.5 16.5,14.5 18.5,22 12,18 5.5,22 7.5,14.5 2,9.5 9,9" fill="#FFC93C" stroke="#E0A400" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: '#12263F', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '22px', fontWeight: 900, lineHeight: '28px' }}>
            2
          </div>
        </div>
      </div>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '24px', justifyContent: 'center', paddingTop: '12px' }}>
        <div style={{ alignItems: 'center', backgroundColor: '#2557D6', borderRadius: '48px', boxShadow: '#17399A 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '96px', justifyContent: 'center', width: '96px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', flexShrink: '0' }}>
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: '#12263F', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: '64px' }}>
          Hop by 100. What comes next?
        </div>
      </div>
      <div style={{ backgroundColor: '#DDF5EE', borderRadius: '40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', marginLeft: '120px', marginRight: '120px', marginTop: '36px', paddingBottom: '36px', paddingInline: '48px', paddingTop: '40px' }}>
        <svg width="1080" height="90" viewBox="0 0 1080 90" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', flexShrink: '0' }}>
          <g>
            <path d="M110 80Q205 0 300 80" fill="none" stroke="#2557D6" strokeWidth="5" strokeLinecap="round" />
            <path d="M300 80Q395 0 490 80" fill="none" stroke="#2557D6" strokeWidth="5" strokeLinecap="round" />
            <path d="M490 80Q585 0 680 80" fill="none" stroke="#2557D6" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" />
            <path d="M680 80Q775 0 870 80" fill="none" stroke="#2557D6" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" />
          </g>
        </svg>
        <div style={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingInline: '20px' }}>
          <div style={{ alignItems: 'center', backgroundColor: '#2557D6', borderRadius: '28px', boxShadow: '#17399A 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '110px', justifyContent: 'center', width: '180px' }}>
            <div style={{ boxSizing: 'border-box', color: '#FFFFFF', display: 'flex', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, lineHeight: '68px' }}>
              100
            </div>
          </div>
          <div style={{ alignItems: 'center', backgroundColor: '#2557D6', borderRadius: '28px', boxShadow: '#17399A 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '110px', justifyContent: 'center', width: '180px' }}>
            <div style={{ boxSizing: 'border-box', color: '#FFFFFF', display: 'flex', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, lineHeight: '68px' }}>
              200
            </div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', borderColor: '#2557D6', borderRadius: '28px', borderStyle: 'dashed', borderWidth: '4px', boxSizing: 'border-box', flexShrink: '0', height: '110px', width: '180px' }} />
          <div style={{ backgroundColor: '#F3F7FF', borderColor: '#BFD0F5', borderRadius: '28px', borderStyle: 'dashed', borderWidth: '4px', boxSizing: 'border-box', flexShrink: '0', height: '110px', width: '180px' }} />
          <div style={{ backgroundColor: '#F3F7FF', borderColor: '#BFD0F5', borderRadius: '28px', borderStyle: 'dashed', borderWidth: '4px', boxSizing: 'border-box', flexShrink: '0', height: '110px', width: '180px' }} />
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', paddingTop: '40px', textAlign: 'center' }}>
        <div style={{ boxSizing: 'border-box', color: '#5B6B80', display: 'flex', flexWrap: 'wrap', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '24px', fontWeight: 700, justifyContent: 'center', lineHeight: '30px', textAlign: 'center' }}>
          Pick the numbers that fit. Tap a number to hear it.
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', display: 'flex', gap: '24px', justifyContent: 'center', paddingTop: '28px' }}>
        <div style={{ alignItems: 'center', borderColor: '#E3E8EF', borderRadius: '28px', borderStyle: 'solid', borderWidth: '4px', boxShadow: '#E3E8EF 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '110px', justifyContent: 'center', width: '180px' }}>
          <div style={{ boxSizing: 'border-box', color: '#12263F', display: 'flex', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, lineHeight: '68px' }}>
            500
          </div>
        </div>
        <div style={{ alignItems: 'center', borderColor: '#E3E8EF', borderRadius: '28px', borderStyle: 'solid', borderWidth: '4px', boxShadow: '#E3E8EF 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '110px', justifyContent: 'center', width: '180px' }}>
          <div style={{ boxSizing: 'border-box', color: '#12263F', display: 'flex', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, lineHeight: '68px' }}>
            300
          </div>
        </div>
        <div style={{ alignItems: 'center', borderColor: '#E3E8EF', borderRadius: '28px', borderStyle: 'solid', borderWidth: '4px', boxShadow: '#E3E8EF 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '110px', justifyContent: 'center', width: '180px' }}>
          <div style={{ boxSizing: 'border-box', color: '#12263F', display: 'flex', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, lineHeight: '68px' }}>
            700
          </div>
        </div>
        <div style={{ alignItems: 'center', borderColor: '#E3E8EF', borderRadius: '28px', borderStyle: 'solid', borderWidth: '4px', boxShadow: '#E3E8EF 0px 6px 0px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '110px', justifyContent: 'center', width: '180px' }}>
          <div style={{ boxSizing: 'border-box', color: '#12263F', display: 'flex', fontFamily: '"Nunito", system-ui, sans-serif', fontSize: '56px', fontWeight: 900, lineHeight: '68px' }}>
            400
          </div>
        </div>
      </div>
    </div>
  );
}
