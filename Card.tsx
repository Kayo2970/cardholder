import React, { useState, useEffect, useRef } from 'react';
import styles from './Card.module.css';

export interface InteractiveCardHolderProps {
  logoSrc?: string;
  debossedLogoSrc?: string;
  memberName?: string;
  memberRole?: string;
  phone?: string;
  email?: string;
  qrUrl?: string;
  walletShareUrl?: string;
}

export const InteractiveCardHolder: React.FC<InteractiveCardHolderProps> = ({
  logoSrc = './leads-logo-clean.png',
  debossedLogoSrc = './leather-debossed-logo.png',
  memberName = 'Bhawen Maroo',
  memberRole = 'Alumni Member',
  phone = '+91 9608768647',
  email = 'bhawenmaroo@gmail.com',
  qrUrl = './leads-qr-code.png',
  walletShareUrl = 'https://api.walletwallet.dev/p/e1f116cc-3aa7-4cd9-8362-123ea660021f',
}) => {
  const [stageState, setStageState] = useState<'init' | 'entered' | 'opened' | 'extracting' | 'extracted' | 'tucking' | 'closing'>('init');
  const [activeTab, setActiveTab] = useState<'card' | 'creds'>('card');
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({ isDragging: false, startY: 0, currentDeltaY: 0, hasDragged: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStageState('entered');
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleHolderClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.passCard}`) || (e.target as HTMLElement).closest(`.${styles.coverBack}`)) {
      return;
    }
    if (stageState === 'extracting' || stageState === 'tucking' || stageState === 'closing') return;

    if (stageState === 'entered') {
      setStageState('opened');
      setActiveTab('card');
    } else if (stageState === 'opened') {
      setStageState('closing');
      setTimeout(() => {
        setStageState('entered');
      }, 1000);
    } else if (stageState === 'extracted') {
      triggerExtract();
    }
  };

  const triggerExtract = () => {
    if (stageState === 'opened') {
      setIsFlipped(false);
      setStageState('extracting');
      setTimeout(() => {
        setStageState('extracted');
      }, 750);
    } else if (stageState === 'extracted') {
      setIsFlipped(false);
      setStageState('tucking');
      setTimeout(() => {
        setStageState('opened');
      }, 650);
    }
  };

  const toggleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (stageState === 'extracted') {
      setIsFlipped((prev) => !prev);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (stageState !== 'opened' && stageState !== 'extracted') return;
    if (stageState === 'extracting' || stageState === 'tucking' || stageState === 'closing') return;

    dragInfo.current = {
      isDragging: true,
      startY: e.clientY,
      currentDeltaY: 0,
      hasDragged: false,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDragging) return;
    const deltaY = dragInfo.current.startY - e.clientY;

    if (Math.abs(deltaY) > 8) {
      dragInfo.current.hasDragged = true;
    }

    if (stageState === 'opened' && cardRef.current) {
      if (deltaY > 0) {
        dragInfo.current.currentDeltaY = Math.min(deltaY, 200);
        const progress = dragInfo.current.currentDeltaY / 200;
        const zOffset = 2 + progress * 88;
        const yOffset = -26 * (1 - progress);
        cardRef.current.style.transition = 'none';
        cardRef.current.style.transform = `translateZ(${zOffset}px) translateY(${yOffset}px) scale(${1 + progress * 0.03})`;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDragging) return;
    dragInfo.current.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (cardRef.current) {
      cardRef.current.style.transition = '';
      cardRef.current.style.transform = '';
    }

    if (dragInfo.current.hasDragged) {
      if (stageState === 'opened') {
        if (dragInfo.current.currentDeltaY > 40) {
          triggerExtract();
        }
      } else if (stageState === 'extracted') {
        if (dragInfo.current.currentDeltaY < -40) {
          triggerExtract();
        }
      }
    } else {
      if (stageState === 'opened') {
        triggerExtract();
      } else if (stageState === 'extracted') {
        toggleFlip();
      }
    }
    dragInfo.current.currentDeltaY = 0;
  };

  const handleReplay = () => {
    setStageState('init');
    setActiveTab('card');
    setIsFlipped(false);
    setTimeout(() => {
      setStageState('entered');
    }, 400);
  };

  const getHolderClasses = () => {
    const classes = [styles.holderWrap];
    if (stageState !== 'init') classes.push(styles.entered);
    if (stageState === 'opened' || stageState === 'extracting' || stageState === 'extracted' || stageState === 'tucking') {
      classes.push(styles.opened);
    }
    if (stageState === 'extracting') {
      classes.push(styles.cardExtracting, styles.cardExtracted);
    } else if (stageState === 'extracted') {
      classes.push(styles.cardExtracted);
    } else if (stageState === 'tucking') {
      classes.push(styles.cardTucking);
    }
    if (stageState === 'closing') {
      classes.push(styles.closing);
    }
    if (activeTab === 'creds') {
      classes.push(styles.showCreds);
    }
    return classes.join(' ');
  };

  const getPassCardClasses = () => {
    const classes = [styles.passCard];
    if (isFlipped) classes.push(styles.isFlipped);
    return classes.join(' ');
  };

  return (
    <div className={styles.stageContainer}>
      {/* Top Status Badge & Mobile Switcher */}
      <div className={styles.headerPanel}>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>
            {stageState === 'init' && 'Arriving into view...'}
            {stageState === 'entered' && 'Tap leather holder to open'}
            {stageState === 'opened' && 'Tap card to pull forward'}
            {stageState === 'extracting' && 'Extracting card...'}
            {stageState === 'extracted' &&
              (isFlipped ? 'Viewing Back Details (5 Fields) · Tap to Flip ↻' : 'Card Ready · Tap card to flip ↻')}
            {stageState === 'tucking' && 'Tucking card back...'}
            {stageState === 'closing' && 'Closing leather holder...'}
          </span>
        </div>

        {stageState === 'opened' && (
          <div className={styles.mobileFlapToggle}>
            <button
              className={`${styles.flapTab} ${activeTab === 'card' ? styles.flapTabActive : ''}`}
              onClick={() => setActiveTab('card')}
            >
              💳 Keycard
            </button>
            <button
              className={`${styles.flapTab} ${activeTab === 'creds' ? styles.flapTabActive : ''}`}
              onClick={() => setActiveTab('creds')}
            >
              📋 Executive Info
            </button>
          </div>
        )}
      </div>

      {/* 3D Experience Stage */}
      <div className={styles.experienceStage}>
        <div className={getHolderClasses()} onClick={handleHolderClick}>
          
          {/* Base Body & Inside Right Pocket (Dark Blue Leather Finished) */}
          <div className={`${styles.holderBase} ${styles.leatherTexture}`}>
            <div className={styles.baseStitch} />

            {/* The Pass Card with 3D Flip Engine */}
            <div
              ref={cardRef}
              className={getPassCardClasses()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              title="Click or drag to pull / flip card"
            >
              <div className={styles.passInner}>
                
                {/* FRONT FACE */}
                <div className={`${styles.passFace} ${styles.passFront}`}>
                  <div>
                    <div className={styles.passHeader}>
                      <img src={logoSrc} alt="LEADS Logo" className={styles.passMiniLogo} />
                      <span className={styles.passBadgePill}>ACTIVE PASS</span>
                    </div>

                    <div className={styles.passPrimary}>
                      <div>
                        <div className={styles.passLabel}>{memberRole}</div>
                        <div className={styles.passName}>{memberName}</div>
                      </div>
                      <img src={logoSrc} alt="LEADS RUAS" className={styles.passSideLogo} />
                    </div>

                    <div className={styles.passGrid}>
                      <div>
                        <div className={styles.passLabel}>Phone Number</div>
                        <div className={styles.passVal}>{phone}</div>
                      </div>
                      <div>
                        <div className={styles.passLabel}>Email ID</div>
                        <div className={styles.passVal} title={email}>{email}</div>
                      </div>
                    </div>

                    <div className={styles.passQrBox}>
                      <img src={qrUrl} alt="QR Code" />
                    </div>
                  </div>

                  <div className={styles.passCardFooter}>
                    <div className={styles.flipAffordanceHint}>
                      <span>↻</span>
                      <span>Tap to Flip for 5 Back Fields</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '8.5px' }}>
                      <span>💳</span>
                      <span>Leads Next Gen Centre</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className={`${styles.passFace} ${styles.passBack}`}>
                  <div className={styles.passBackHeader}>
                    <div>
                      <div className={styles.passLabel}>PASS DETAILS</div>
                      <div className={styles.passBackTitle}>LEADS RUAS Pass Info</div>
                    </div>
                    <button className={styles.btnFlipPill} onClick={toggleFlip} title="Flip to front">
                      <span>↺</span>
                      <span>Front</span>
                    </button>
                  </div>

                  <div className={styles.passBackFields}>
                    <div className={styles.backFieldRow}>
                      <span className={styles.backFieldLabel}>1. Access Level</span>
                      <span className={styles.backFieldVal}>Executive & Alumni Fellow (Tier 1)</span>
                    </div>
                    <div className={styles.backFieldRow}>
                      <span className={styles.backFieldLabel}>2. Pass Serial ID</span>
                      <span className={styles.backFieldVal}>RUAS-LEADS-2026-08842</span>
                    </div>
                    <div className={styles.backFieldRow}>
                      <span className={styles.backFieldLabel}>3. Validity Period</span>
                      <span className={styles.backFieldVal}>Jan 2026 – Dec 2028 (3 Years)</span>
                    </div>
                    <div className={styles.backFieldRow}>
                      <span className={styles.backFieldLabel}>4. Issuing Authority</span>
                      <span className={styles.backFieldVal}>M. S. Ramaiah Univ. of Applied Sciences</span>
                    </div>
                    <div className={styles.backFieldRow}>
                      <span className={styles.backFieldLabel}>5. Terms & Entry Verification</span>
                      <p className={styles.backNoticeText}>
                        Scan front QR code at entry turnstiles. Non-transferable pass.
                      </p>
                    </div>
                  </div>

                  <div className={styles.passBackFooter}>
                    <span>© 2026 LEADS Next Gen Centre</span>
                    <span>Tap card to flip</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Curved Die-Cut Leather Pocket Sleeve */}
            <div className={styles.curvedPocketSleeve}>
              <div className={styles.curvedPocketStitch} />
              <div className={styles.pocketFooterContent}>
                <div className={styles.pocketBrandLabel}>
                  <svg className={styles.pocketIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>Card Holder</span>
                </div>
                {stageState !== 'extracted' && stageState !== 'extracting' && (
                  <span className={styles.tapHintPill}>Tap Card &uarr;</span>
                )}
              </div>
            </div>

          </div>

          {/* 3D Flipping Leather Front Cover Leaf */}
          <div className={styles.coverLeaf}>
            
            {/* Front Side: Dark Blue Leather + Deep Heat-Stamped Debossed Logo */}
            <div className={styles.coverFront}>
              <div className={styles.coverStitch} />
              <img src={debossedLogoSrc} alt="LEADS Next Gen Centre" className={styles.debossedLeatherLogo} />
              <div className={styles.coverPrompt}>Tap to Open &rarr;</div>
            </div>

            {/* Back Side: Interior Left Flap with Executive Credentials Layout */}
            <div
              className={styles.coverBack}
              onClick={() => {
                if (stageState === 'opened') setActiveTab('creds');
              }}
            >
              <div className={styles.coverBackStitch} />
              
              <div className={styles.leftPanelHeader}>
                <div>
                  <div className={styles.leftPanelTitle}>LEADS Centre</div>
                  <div className={styles.leftPanelSub}>RUAS Executive Pass</div>
                </div>
                <span className={styles.leftBadgeTag}>Official</span>
              </div>

              {/* White Pill Slot Fields */}
              <div className={styles.leftFormFields}>
                <div className={styles.formSlot}>
                  <span className={styles.formSlotLabel}>Name / Nombre</span>
                  <div className={styles.formSlotPill}>{memberName}</div>
                </div>

                <div className={styles.formSlot}>
                  <span className={styles.formSlotLabel}>Designation / Rol</span>
                  <div className={styles.formSlotPill}>{memberRole}</div>
                </div>

                <div className={styles.formSlot}>
                  <span className={styles.formSlotLabel}>Phone / Teléfono</span>
                  <div className={styles.formSlotPill}>{phone}</div>
                </div>

                <div className={styles.formSlot}>
                  <span className={styles.formSlotLabel}>Email / Correo</span>
                  <div className={styles.formSlotPill}>{email}</div>
                </div>
              </div>

              <div className={styles.leftPanelFooter}>
                M. S. Ramaiah University of Applied Sciences<br />
                New BEL Road, MSR Nagar, Bengaluru - 560054
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={styles.actionsPanel}>
        <button className={styles.btnAction} onClick={handleReplay}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Replay Animation
        </button>
        <a
          href={walletShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btnAction} ${styles.btnWallet}`}
        >
          <svg width="14" height="14" viewBox="0 0 170 170" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-6.19-9.56-10.9-20.48-14.15-32.76-3.25-12.28-4.88-23.77-4.88-34.46 0-14.02 3.42-25.59 10.25-34.72 6.84-9.12 15.42-13.82 25.75-14.1 4.79-.1 10.05 1.25 15.79 4.04 5.73 2.79 9.53 4.24 11.39 4.35 1.52-.11 5.58-1.63 12.18-4.56 6.6-2.93 12.14-4.22 16.63-3.86 12.4.98 22.38 5.74 29.93 14.28-10.87 6.63-16.19 15.54-15.96 26.74.22 8.7 3.59 16.14 10.11 22.33 6.52 6.19 14.46 9.89 23.82 11.1-2.17 6.53-4.67 13.05-7.5 19.56zM119.22 33.04c0-7.39 2.61-14.24 7.83-20.55 5.22-6.31 11.63-10.47 19.24-12.49 1.09 7.39-1.2 14.57-6.86 21.53-5.65 6.96-12.39 10.8-20.21 11.51z"/>
          </svg>
          Add to Apple / Google Wallet
        </a>
      </div>
    </div>
  );
};
export default InteractiveCardHolder;
