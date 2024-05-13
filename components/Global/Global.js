import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";

export async function fetchLocations() {
    try {
        const response = await axios.get(
            `${serveraddress}location/locations`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
}

// export async function fetchLocations() {
//     try {
//         const response = await axios.get(
//             `${serveraddress}location/locations`
//         );
//         const locationData = response.data;
//         return locationData;
//     } catch (error) {
//         console.error("Error fetching locations:", error);
//         return [];
//     }
// }

// export const locationData = fetchLocations();

export function getShiftOptions() {
    return [
        { value: "Morning A Shift", label: "Morning A Shift" },
        { value: "Morning General Shift", label: "Morning General Shift" },
        { value: "Afternoon B Shift", label: "Afternoon B Shift" },
        { value: "Night C Shift", label: "Night C Shift" },
    ];
}