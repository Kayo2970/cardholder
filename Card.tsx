import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';

export interface InteractiveCardHolderProps {
  logoSrc?: string;
  memberName?: string;
  memberRole?: string;
  phone?: string;
  email?: string;
  qrUrl?: string;
  walletShareUrl?: string;
}

export const InteractiveCardHolder: React.FC<InteractiveCardHolderProps> = ({
  logoSrc = './leads-logo-clean.png',
  memberName = 'Bhawen Maroo',
  memberRole = 'Alumni Member',
  phone = '9608768647',
  email = 'bhawenmaroo@gmail.com',
  qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fleadsnextgencentre.online%2Fcard%2Fbhawen-maroo&color=090D16',
  walletShareUrl = 'https://api.walletwallet.dev/p/e1f116cc-3aa7-4cd9-8362-123ea660021f',
}) => {
  const [stageState, setStageState] = useState<'init' | 'entered' | 'opened' | 'extracted'>('init');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStageState('entered');
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleHolderClick = () => {
    if (stageState === 'entered') {
      setStageState('opened');
    } else if (stageState === 'opened') {
      setStageState('entered');
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stageState === 'opened') {
      setStageState('extracted');
    } else if (stageState === 'extracted') {
      setStageState('opened');
    }
  };

  const handleReplay = () => {
    setStageState('init');
    setTimeout(() => {
      setStageState('entered');
    }, 350);
  };

  const getHolderClasses = () => {
    const classes = [styles.holderWrap];
    if (stageState !== 'init') classes.push(styles.entered);
    if (stageState === 'opened' || stageState === 'extracted') classes.push(styles.opened);
    if (stageState === 'extracted') classes.push(styles.cardExtracted);
    return classes.join(' ');
  };

  return (
    <div className={styles.stageContainer}>
      {/* Top Status Badge */}
      <div className={styles.headerPanel}>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>
            {stageState === 'init' && 'Arriving into view...'}
            {stageState === 'entered' && 'Tap leather holder to open'}
            {stageState === 'opened' && 'Tap card to pull forward'}
            {stageState === 'extracted' && 'Welcome to the Centre! Card Ready'}
          </span>
        </div>
      </div>

      {/* 3D Experience Stage */}
      <div className={styles.experienceStage}>
        <div className={getHolderClasses()} onClick={handleHolderClick}>
          
          {/* Base Body & Inside Right Pocket (Dark Blue Leather Finished) */}
          <div className={`${styles.holderBase} ${styles.leatherTexture}`}>
            <div className={styles.baseStitch} />

            {/* The Pass Card */}
            <div className={styles.passCard} onClick={handleCardClick}>
              <div>
                <div className={styles.passHeader}>
                  <img src={logoSrc} alt="LEADS Logo" className={styles.passMiniLogo} />
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
                    <div className={styles.passVal}>{email}</div>
                  </div>
                </div>

                <div className={styles.passQrBox}>
                  <img src={qrUrl} alt="QR Code" />
                </div>
              </div>

              <div className={styles.passCardFooter}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>&#x21C5;</span>
                  <span>5 back fields</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>&#128179;</span>
                  <span>Leads Next Gen Centre</span>
                </div>
              </div>
            </div>

            {/* Lower Leather Pocket Sleeve with Saddle Stitching */}
            <div className={styles.pocketSleeve}>
              <div className={styles.pocketStitch} />
              <div className={styles.pocketLabel}>
                <div className={styles.pocketBrand}>
                  <svg className={styles.pocketIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>Leather Card Holder</span>
                </div>
                {stageState !== 'extracted' && (
                  <span className={styles.tapHintPill}>Tap Card &uarr;</span>
                )}
              </div>
            </div>
          </div>

          {/* 3D Flipping Leather Front Cover Leaf */}
          <div className={styles.coverLeaf}>
            
            {/* Front Side: Dark Blue Leather + Stitched Edge + Deep Stamped Debossed Logo */}
            <div className={styles.coverFront}>
              <div className={styles.coverStitch} />
              
              <div className={styles.debossedStampArea}>
                <img src={logoSrc} alt="LEADS Next Gen Centre" className={styles.stampedLogoImg} />
              </div>

              <div className={styles.coverPrompt}>Tap to Open &rarr;</div>
            </div>

            {/* Back Side: Interior Left Flap with Welcome Message and Crest */}
            <div className={styles.coverBack}>
              <div className={styles.coverBackStitch} />
              <div className={styles.coverBackHeader}>Official Credentials</div>
              
              <div className={styles.coverBackBody}>
                <div className={styles.crestIcon}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h2 className={styles.welcomeMainTitle}>Welcome to the Centre</h2>
                  <p className={styles.welcomeMainSub}>
                    <strong>LEADS Next Gen Centre</strong><br />
                    M. S. Ramaiah University of Applied Sciences
                  </p>
                </div>
              </div>

              <div className={styles.coverBackFooter}>ruas.ac.in/leads</div>
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
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-6.19-9.56-10.9-20.48-14.15-32.76-3.25-12.28-4.88-23.77-4.88-34.46 0-14.02 3.42-25.59 10.25-34.72 6.84-9.12 15.42-13.82 25.75-14.1 4.79-.1 10.05 1.25 15.79 4.04 5.73 2.79 9.53 4.24 11.39 4.35 1.52-.11 5.58-1.63 12.18-4.56 6.6-2.93 12.14-4.22 16.63-3.86 12.4.98 22.38 5.74 29.93 14.28-10.87 6.63-16.19 15.54-15.96 26.74.22 8.7 3.59 16.14 10.11 22.33 6.52 6.19 14.46 9.89 23.82 11.1-2.17 6.53-4.67 13.05-7.5 19.56zM119.22 33.04c0-7.39 2.61-14.24 7.83-20.55 5.22-6.31 11.63-10.47 19.24-12.49 1.09 7.39-1.2 14.57-6.86 21.53-5.65 6.96-12.39 10.8-20.21 11.51z" />
          </svg>
          Add to Apple / Google Wallet
        </a>
      </div>
    </div>
  );
};

export default InteractiveCardHolder;
