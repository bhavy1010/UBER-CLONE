import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";

import L from "leaflet";

const pickupIcon = new L.Icon({
    iconUrl:
        "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [40, 40]
});

const destinationIcon = new L.Icon({
    iconUrl:
        "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [40, 40]
});

const LiveMap = ({
    pickup,
    destination
}) => {

    if (
        !pickup ||
        !destination ||
        pickup.includes(undefined) ||
        destination.includes(undefined)
    ) {
        return null;
    }

    return (
        <div className="h-full w-full">

            <MapContainer
                center={pickup}
                zoom={13}
                className="h-full w-full"
                zoomControl={false}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={pickup}
                    icon={pickupIcon}
                >
                    <Popup>
                        Pickup Location
                    </Popup>
                </Marker>

                <Marker
                    position={destination}
                    icon={destinationIcon}
                >
                    <Popup>
                        Destination
                    </Popup>
                </Marker>

                <Polyline
                    positions={[
                        pickup,
                        destination
                    ]}
                    pathOptions={{
                        color: "#2563eb",
                        weight: 6,
                        opacity: 0.8
                    }}
                />

            </MapContainer>

            {/* Gradient Overlay */}

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20 z-[400]"></div>

        </div>
    );
};

export default LiveMap;