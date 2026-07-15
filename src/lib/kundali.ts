// Geocoding + shared static tables for the Kundali page.
// The actual astrology engine runs server-side (see artifacts/api-server/src/lib/astrology.ts)
// and is called via the generated `useGenerateKundali` React Query hook from @workspace/api-client-react.

export interface BirthData {
  name: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24h)
  place: string;
  latitude: number;
  longitude: number;
}

export const RASHIS = [
  { name: "Mesha", english: "Aries", symbol: "♈", ruler: "Mars", element: "Fire" },
  { name: "Vrishabha", english: "Taurus", symbol: "♉", ruler: "Venus", element: "Earth" },
  { name: "Mithuna", english: "Gemini", symbol: "♊", ruler: "Mercury", element: "Air" },
  { name: "Karka", english: "Cancer", symbol: "♋", ruler: "Moon", element: "Water" },
  { name: "Simha", english: "Leo", symbol: "♌", ruler: "Sun", element: "Fire" },
  { name: "Kanya", english: "Virgo", symbol: "♍", ruler: "Mercury", element: "Earth" },
  { name: "Tula", english: "Libra", symbol: "♎", ruler: "Venus", element: "Air" },
  { name: "Vrishchika", english: "Scorpio", symbol: "♏", ruler: "Mars", element: "Water" },
  { name: "Dhanu", english: "Sagittarius", symbol: "♐", ruler: "Jupiter", element: "Fire" },
  { name: "Makara", english: "Capricorn", symbol: "♑", ruler: "Saturn", element: "Earth" },
  { name: "Kumbha", english: "Aquarius", symbol: "♒", ruler: "Saturn", element: "Air" },
  { name: "Meena", english: "Pisces", symbol: "♓", ruler: "Jupiter", element: "Water" },
];

export async function geocodePlace(place: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`;
    const resp = await fetch(url, { headers: { "User-Agent": "SeleniteSoul/1.0" } });
    const data = await resp.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
  } catch {
    // fall through
  }
  return null;
}

export const INDIAN_CITIES = [
  { name: "Mumbai, Maharashtra", lat: 19.0760, lon: 72.8777 },
  { name: "Delhi, Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Bengaluru, Karnataka", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata, West Bengal", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai, Tamil Nadu", lat: 13.0827, lon: 80.2707 },
  { name: "Hyderabad, Telangana", lat: 17.3850, lon: 78.4867 },
  { name: "Pune, Maharashtra", lat: 18.5204, lon: 73.8567 },
  { name: "Ahmedabad, Gujarat", lat: 23.0225, lon: 72.5714 },
  { name: "Surat, Gujarat", lat: 21.1702, lon: 72.8311 },
  { name: "Jaipur, Rajasthan", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow, Uttar Pradesh", lat: 26.8467, lon: 80.9462 },
  { name: "Kanpur, Uttar Pradesh", lat: 26.4499, lon: 80.3319 },
  { name: "Nagpur, Maharashtra", lat: 21.1458, lon: 79.0882 },
  { name: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
  { name: "Thane, Maharashtra", lat: 19.2183, lon: 72.9781 },
  { name: "Bhopal, Madhya Pradesh", lat: 23.2599, lon: 77.4126 },
  { name: "Visakhapatnam, Andhra Pradesh", lat: 17.6868, lon: 83.2185 },
  { name: "Patna, Bihar", lat: 25.5941, lon: 85.1376 },
  { name: "Vadodara, Gujarat", lat: 22.3072, lon: 73.1812 },
  { name: "Ghaziabad, Uttar Pradesh", lat: 28.6692, lon: 77.4538 },
  { name: "Ludhiana, Punjab", lat: 30.9010, lon: 75.8573 },
  { name: "Agra, Uttar Pradesh", lat: 27.1767, lon: 78.0081 },
  { name: "Nashik, Maharashtra", lat: 19.9975, lon: 73.7898 },
  { name: "Faridabad, Haryana", lat: 28.4089, lon: 77.3178 },
  { name: "Meerut, Uttar Pradesh", lat: 28.9845, lon: 77.7064 },
  { name: "Rajkot, Gujarat", lat: 22.3039, lon: 70.8022 },
  { name: "Varanasi, Uttar Pradesh", lat: 25.3176, lon: 82.9739 },
  { name: "Srinagar, Jammu & Kashmir", lat: 34.0837, lon: 74.7973 },
  { name: "Aurangabad, Maharashtra", lat: 19.8762, lon: 75.3433 },
  { name: "Dhanbad, Jharkhand", lat: 23.7957, lon: 86.4304 },
  { name: "Amritsar, Punjab", lat: 31.6340, lon: 74.8723 },
  { name: "Navi Mumbai, Maharashtra", lat: 19.0330, lon: 73.0297 },
  { name: "Allahabad, Uttar Pradesh", lat: 25.4358, lon: 81.8463 },
  { name: "Ranchi, Jharkhand", lat: 23.3441, lon: 85.3096 },
  { name: "Howrah, West Bengal", lat: 22.5958, lon: 88.2636 },
  { name: "Coimbatore, Tamil Nadu", lat: 11.0168, lon: 76.9558 },
  { name: "Jabalpur, Madhya Pradesh", lat: 23.1815, lon: 79.9864 },
  { name: "Gwalior, Madhya Pradesh", lat: 26.2183, lon: 78.1828 },
  { name: "Vijayawada, Andhra Pradesh", lat: 16.5062, lon: 80.6480 },
  { name: "Jodhpur, Rajasthan", lat: 26.2389, lon: 73.0243 },
  { name: "Madurai, Tamil Nadu", lat: 9.9252, lon: 78.1198 },
  { name: "Raipur, Chhattisgarh", lat: 21.2514, lon: 81.6296 },
  { name: "Kota, Rajasthan", lat: 25.2138, lon: 75.8648 },
  { name: "Guwahati, Assam", lat: 26.1445, lon: 91.7362 },
  { name: "Chandigarh, Chandigarh", lat: 30.7333, lon: 76.7794 },
  { name: "Solapur, Maharashtra", lat: 17.6599, lon: 75.9064 },
  { name: "Mysore, Karnataka", lat: 12.2958, lon: 76.6394 },
  { name: "Gurgaon, Haryana", lat: 28.4595, lon: 77.0266 },
  { name: "Aligarh, Uttar Pradesh", lat: 27.8936, lon: 78.0883 },
  { name: "Jalandhar, Punjab", lat: 31.3260, lon: 75.5762 },
  { name: "Tiruchirappalli, Tamil Nadu", lat: 10.7905, lon: 78.7047 },
  { name: "Bhubaneswar, Odisha", lat: 20.2961, lon: 85.8245 },
  { name: "Salem, Tamil Nadu", lat: 11.6643, lon: 78.1460 },
  { name: "Gorakhpur, Uttar Pradesh", lat: 26.7606, lon: 83.3731 },
  { name: "Noida, Uttar Pradesh", lat: 28.5355, lon: 77.3910 },
  { name: "Jamshedpur, Jharkhand", lat: 22.8046, lon: 86.2029 },
  { name: "Kochi, Kerala", lat: 9.9312, lon: 76.2673 },
  { name: "Dehradun, Uttarakhand", lat: 30.3165, lon: 78.0322 },
  { name: "Jammu, Jammu & Kashmir", lat: 32.7266, lon: 74.8570 },
  { name: "Mangalore, Karnataka", lat: 12.9141, lon: 74.8560 },
  { name: "Udaipur, Rajasthan", lat: 24.5854, lon: 73.7125 },
  { name: "Shimla, Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
  { name: "Puducherry, Puducherry", lat: 11.9416, lon: 79.8083 },
  { name: "Haridwar, Uttar Pradesh", lat: 29.9457, lon: 78.1642 },
  { name: "Panaji, Goa", lat: 15.4909, lon: 73.8278 },
  { name: "Darjeeling, West Bengal", lat: 27.0410, lon: 88.2627 },
  { name: "Gaya, Bihar", lat: 24.7955, lon: 84.9994 },
  { name: "Rishikesh, Uttarakhand", lat: 30.0869, lon: 78.2676 },
  { name: "Ujjain, Madhya Pradesh", lat: 23.1760, lon: 75.7885 },
  { name: "Mathura, Uttar Pradesh", lat: 27.4924, lon: 77.6737 },
];

export async function searchIndianPlaces(query: string): Promise<Array<{ name: string; lat: number; lon: number }>> {
  if (!query || query.length < 2) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=in&limit=6`;
    const resp = await fetch(url, { headers: { "User-Agent": "SeleniteSoul/1.0" } });
    const data = await resp.json();
    if (data && data.length > 0) {
      return data.map((item: any) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }));
    }
  } catch {
    // fall through
  }
  return [];
}

export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const resp = await fetch(url, { headers: { "User-Agent": "SeleniteSoul/1.0" } });
    const data = await resp.json();
    if (data && data.display_name) {
      return data.display_name;
    }
  } catch {
    // fall through
  }
  return null;
}
