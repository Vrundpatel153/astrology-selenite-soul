import * as zod from 'zod';

export const generateKundaliBodyDateRegExp = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
export const generateKundaliBodyTimeRegExp = new RegExp('^\\d{2}:\\d{2}$');
export const generateKundaliBodyLatitudeMin = -90;
export const generateKundaliBodyLatitudeMax = 90;

export const generateKundaliBodyLongitudeMin = -180;
export const generateKundaliBodyLongitudeMax = 180;

export const GenerateKundaliBody = zod.object({
  "name": zod.string().min(1),
  "date": zod.string().regex(generateKundaliBodyDateRegExp).describe('Birth date, YYYY-MM-DD (Gregorian calendar).'),
  "time": zod.string().regex(generateKundaliBodyTimeRegExp).describe('Local birth time, 24h HH:MM, as it appeared on a clock at the birth place.'),
  "latitude": zod.number().min(generateKundaliBodyLatitudeMin).max(generateKundaliBodyLatitudeMax),
  "longitude": zod.number().min(generateKundaliBodyLongitudeMin).max(generateKundaliBodyLongitudeMax),
  "place": zod.string()
}).describe('Exact birth details required for an accurate sidereal chart.');

export const generateKundaliResponseLagnaMax = 12;
export const generateKundaliResponsePlanetsItemRashiMax = 12;
export const generateKundaliResponsePlanetsItemNakshatraPadaMax = 4;
export const generateKundaliResponsePlanetsItemHouseMax = 12;

export const GenerateKundaliResponse = zod.object({
  "lagna": zod.number().min(1).max(generateKundaliResponseLagnaMax),
  "lagnaName": zod.string(),
  "lagnaSymbol": zod.string(),
  "lagnaLongitude": zod.number(),
  "planets": zod.array(zod.object({
    "name": zod.string(),
    "sanskrit": zod.string(),
    "symbol": zod.string(),
    "longitude": zod.number().describe('Sidereal ecliptic longitude, 0-360°'),
    "degreeInSign": zod.number().describe('Degrees elapsed within its rashi, 0-30'),
    "rashi": zod.number().min(1).max(generateKundaliResponsePlanetsItemRashiMax),
    "rashiName": zod.string(),
    "rashiSymbol": zod.string(),
    "nakshatra": zod.string(),
    "nakshatraPada": zod.number().min(1).max(generateKundaliResponsePlanetsItemNakshatraPadaMax),
    "nakshatraLord": zod.string(),
    "house": zod.number().min(1).max(generateKundaliResponsePlanetsItemHouseMax),
    "isRetrograde": zod.boolean(),
    "isCombust": zod.boolean(),
    "dignity": zod.string().nullish().describe('Exalted, Debilitated, Own Sign, Moolatrikona or null'),
    "color": zod.string()
  })),
  "houseRashis": zod.array(zod.number()),
  "moonSign": zod.string(),
  "moonSignSymbol": zod.string(),
  "sunSign": zod.string(),
  "nakshatra": zod.string(),
  "nakshatraPada": zod.number(),
  "nakshatraLord": zod.string(),
  "crystalRecommendations": zod.array(zod.object({
    "crystal": zod.string(),
    "reason": zod.string(),
    "planet": zod.string(),
    "image": zod.string(),
    "benefit": zod.string()
  })),
  "yogas": zod.array(zod.object({
    "name": zod.string(),
    "description": zod.string(),
    "strength": zod.string()
  })),
  "doshas": zod.array(zod.object({
    "name": zod.string(),
    "description": zod.string(),
    "remedy": zod.string(),
    "severity": zod.string().describe('Low, Moderate or High')
  })),
  "currentDasha": zod.object({
    "lord": zod.string(),
    "startDate": zod.string(),
    "endDate": zod.string(),
    "years": zod.number(),
    "antardashas": zod.array(zod.object({
      "lord": zod.string(),
      "startDate": zod.string(),
      "endDate": zod.string()
    })).optional()
  }),
  "currentAntardasha": zod.object({
    "lord": zod.string(),
    "startDate": zod.string(),
    "endDate": zod.string()
  }).optional(),
  "dashaSequence": zod.array(zod.object({
    "lord": zod.string(),
    "startDate": zod.string(),
    "endDate": zod.string(),
    "years": zod.number(),
    "antardashas": zod.array(zod.object({
      "lord": zod.string(),
      "startDate": zod.string(),
      "endDate": zod.string()
    })).optional()
  })),
  "panchang": zod.object({
    "tithi": zod.string(),
    "tithiNumber": zod.number(),
    "paksha": zod.string().describe('Shukla (waxing) or Krishna (waning)'),
    "nakshatra": zod.string(),
    "nakshatraPada": zod.number(),
    "yogaName": zod.string().describe('Nitya yoga (Vishkambha, Priti, ...)'),
    "karana": zod.string(),
    "vara": zod.string().describe('Weekday'),
    "sunrise": zod.string(),
    "sunset": zod.string()
  }),
  "ayanamsa": zod.number()
});

export const HealthCheckResponse = zod.object({
  "status": zod.string()
});
