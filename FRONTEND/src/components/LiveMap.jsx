import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const pickupIcon = new L.Icon({
    iconUrl: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png",
    iconSize: [95, 95]
});

const destinationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [35, 35]
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
        <MapContainer
            center={pickup}
            zoom={12}
            className="h-full w-full z-0"
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
            />
        </MapContainer>
    );
};

export default LiveMap;