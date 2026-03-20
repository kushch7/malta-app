import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontSizeProvider, FontSizeContext } from "./context/FontSizeContext";
import OfflineBanner from "./components/OfflineBanner";
import OnboardingScreen from "./components/OnboardingScreen";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Transport from "./pages/Transport";
import MapPage from "./pages/MapPage";
import Practical from "./pages/Practical";

function AppShell() {
    const { largeText } = useContext(FontSizeContext);

    return (
        <div
            style={{
                maxWidth: 480,
                margin: "0 auto",
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                background: "var(--cream)",
                position: "relative",
                overflow: "hidden",
            }}>
            {/* Live outside the zoom wrapper — always normal size */}
            <OfflineBanner />
            <OnboardingScreen />

            {/* Zoom applied only to scrollable content */}
            <main
                style={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingBottom: "var(--nav-h)",
                    zoom: largeText ? "1.2" : "1",
                }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/places' element={<Places />} />
                    <Route path='/transport' element={<Transport />} />
                    <Route path='/map' element={<MapPage />} />
                    <Route path='/practical' element={<Practical />} />
                </Routes>
            </main>

            <BottomNav />
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <FontSizeProvider>
                <AppShell />
            </FontSizeProvider>
        </BrowserRouter>
    );
}
