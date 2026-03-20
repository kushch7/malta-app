import { useState, useEffect } from "react";

export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(() => navigator.onLine);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);
        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    return (
        <div
            role='status'
            aria-live='polite'
            style={{
                position: "fixed",
                top: 12,
                left: "50%",
                transform: isOnline
                    ? "translateX(-50%) translateY(-100px)"
                    : "translateX(-50%) translateY(0)",
                width: "min(calc(100vw - 32px), 440px)",
                zIndex: 1000,
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                pointerEvents: isOnline ? "none" : "all",
            }}>
            <div
                style={{
                    background: "#1C1917",
                    borderRadius: 14,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    boxShadow:
                        "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
                }}>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        flexShrink: 0,
                        background: "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='#F09595'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <line x1='1' y1='1' x2='23' y2='23' />
                        <path d='M16.72 11.06A10.94 10.94 0 0 1 19 12.55' />
                        <path d='M5 12.55a10.94 10.94 0 0 1 5.17-2.39' />
                        <path d='M10.71 5.05A16 16 0 0 1 22.56 9' />
                        <path d='M1.42 9a15.91 15.91 0 0 1 4.7-2.88' />
                        <path d='M8.53 16.11a6 6 0 0 1 6.95 0' />
                        <line x1='12' y1='20' x2='12.01' y2='20' />
                    </svg>
                </div>

                <div style={{ flex: 1 }}>
                    <p
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#FAFAF9",
                            marginBottom: 1,
                            fontFamily: "var(--font-body)",
                        }}>
                        You're offline
                    </p>
                    <p
                        style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.58)",
                            fontWeight: 300,
                            fontFamily: "var(--font-body)",
                        }}>
                        All saved content is still available
                    </p>
                </div>

                <div
                    style={{
                        position: "relative",
                        width: 10,
                        height: 10,
                        flexShrink: 0,
                    }}>
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            background: "#EF9F27",
                            animation: "pulse-ring 1.8s ease-out infinite",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 2,
                            borderRadius: "50%",
                            background: "#EF9F27",
                        }}
                    />
                </div>
            </div>

            <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.9; }
          70%  { transform: scale(2.4); opacity: 0;   }
          100% { transform: scale(2.4); opacity: 0;   }
        }
      `}</style>
        </div>
    );
}
