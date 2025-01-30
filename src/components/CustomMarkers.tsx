import { AdvancedMarker } from "@vis.gl/react-google-maps";
import React from "react";
import { Dentist } from "../types/dentist";

export type CustomMarkersProps = {
  data: Dentist[];
};

export const CustomMarkers: React.FC<CustomMarkersProps> = ({
  data
}) => {
  
  return data.map((dentist) => (
    <AdvancedMarker
      key={`dentist-${dentist.id}`}
      position={dentist.address.location}
      onClick={(e) => {
        console.log(dentist, e);
      }}
      clickable
    />
  ));
};