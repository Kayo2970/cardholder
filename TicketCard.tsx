import React from 'react';
import styles from './TicketCard.module.css';

export interface TicketCardProps {
  logoText?: string;
  ticketType?: string;
  title?: React.ReactNode;
  subtitle?: string;
  attendeeName?: string;
  eventDate?: string;
  venue?: string;
  gateway?: string;
  barcodeId?: string;
  seatNumber?: string | number;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  logoText = 'UIVERSE',
  ticketType = 'Dev Pass',
  title = (
    <>
      Syntax<br />Error &apos;26
    </>
  ),
  subtitle = 'Global Developer Conference',
  attendeeName = 'Alex Developer',
  eventDate = 'Oct 24, 2026',
  venue = 'Neon Nexus Arena',
  gateway = 'Sector 7G',
  barcodeId = 'UI-77-9X04-DEV',
  seatNumber = '42',
}) => {
  return (
    <div className={styles.ticketCanvas}>
      <div className={styles.ticketWrapper}>
        <div className={styles.ticket}>
          <div className={styles.tMain}>
            <div className={styles.tContent}>
              <div className={styles.tHeader}>
                <div className={styles.tLogo}>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {logoText}
                </div>
                <div className={styles.tType}>{ticketType}</div>
              </div>

              <div className={styles.tTitle}>{title}</div>
              <div className={styles.tSubtitle}>{subtitle}</div>

              <div className={styles.tDetails}>
                <div className={styles.tDetailItem}>
                  <span className={styles.tLabel}>Name</span>
                  <span className={styles.tValue}>{attendeeName}</span>
                </div>
                <div className={styles.tDetailItem}>
                  <span className={styles.tLabel}>Date</span>
                  <span className={styles.tValue}>{eventDate}</span>
                </div>
                <div className={styles.tDetailItem}>
                  <span className={styles.tLabel}>Venue</span>
                  <span className={styles.tValue}>{venue}</span>
                </div>
                <div className={styles.tDetailItem}>
                  <span className={styles.tLabel}>Gateway</span>
                  <span className={styles.tValue}>{gateway}</span>
                </div>
              </div>
            </div>

            <div
              className={styles.tPerforation}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                transform: 'translateY(50%)',
              }}
            >
              <div className={styles.tPerfLine}></div>
            </div>
          </div>

          <div className={styles.tStub}>
            <div className={styles.tBarcodeContainer}>
              <div className={styles.tBarcode}></div>
              <div className={styles.tBarcodeId}>{barcodeId}</div>
            </div>
            <div className={styles.tAdmit}>
              <div className={styles.tAdmitText}>Seat</div>
              <div className={styles.tAdmitNum}>{seatNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
