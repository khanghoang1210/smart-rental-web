import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapContainerStyle = {
    width: "1000px",
    height: "400px", 
    "marginLeft" :"0px",
    "border-radius": "10px",
    "justify": "center"
  };

  const center = {
    lat: 11.9404, // Replace with your desired latitude
    lng: 108.4583, // Replace with your desired longitude
  };

  return (
    <div className="container mx-auto py-8 px-8 max-w-[1100px]">
        <h2 className="text-2xl md:text-2xl font-bold mb-6 text-blue-10">
        Vị trí
      </h2>
      <LoadScript  googleMapsApiKey={import.meta.env.VITE_GG_MAP_API_KEY}>
        <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12} // Adjust zoom level as needed
        >
          <Marker
            position={center}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
