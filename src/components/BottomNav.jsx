import { NavLink } from "react-router-dom";
import { Home, MapPin, Bus, Map, Info } from "lucide-react";

const tabs = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/places", icon: MapPin, label: "Places" },
    { to: "/transport", icon: Bus, label: "Transport" },
    { to: "/map", icon: Map, label: "Map" },
    { to: "/practical", icon: Info, label: "Info" },
];

export default function BottomNav() {
    return (
        <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex max-w-lg mx-auto'>
            {tabs.map(({ to, icon: Icon, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                        `flex-1 flex flex-col items-center py-3 gap-1 text-xs
            ${isActive ? "text-teal-700" : "text-gray-500"}`
                    }>
                    <Icon size={22} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
