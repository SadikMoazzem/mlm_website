/**
 * Cities and Areas Data for Location-Based Masjid Finder
 */

export interface Area {
  id: string
  name: string
  city_id: string
  latitude: number
  longitude: number
  radius_km: number
  masjid_count: number
  description?: string
}

export interface City {
  id: string
  name: string
  country: string
  image_url?: string
  latitude: number
  longitude: number
  areas: Area[]
}

export const cities: City[] = [
  {
    id: "london",
    name: "London",
    country: "England",
    image_url: "/images/cities/london.jpg",
    latitude: 51.5074,
    longitude: -0.1278,
    areas: [
      {
        id: "central-london",
        name: "Central London",
        city_id: "london",
        latitude: 51.5074,
        longitude: -0.1278,
        radius_km: 3,
        masjid_count: 35,
        description: "Heart of London including Westminster, City of London, Holborn"
      },
      {
        id: "east-london",
        name: "East London",
        city_id: "london",
        latitude: 51.5388,
        longitude: -0.0180,
        radius_km: 5,
        masjid_count: 151,
        description: "Tower Hamlets, Newham, Hackney, Waltham Forest, Whitechapel"
      },
      {
        id: "west-london",
        name: "West London",
        city_id: "london",
        latitude: 51.4875,
        longitude: -0.3269,
        radius_km: 4,
        masjid_count: 14,
        description: "Ealing, Hounslow, Hillingdon, Hammersmith, Southall"
      },
      {
        id: "north-london",
        name: "North London",
        city_id: "london",
        latitude: 51.5673,
        longitude: -0.1424,
        radius_km: 4,
        masjid_count: 21,
        description: "Camden, Islington, Barnet, Enfield, Finsbury Park"
      },
      {
        id: "south-london",
        name: "South London",
        city_id: "london",
        latitude: 51.4236,
        longitude: -0.0878,
        radius_km: 5,
        masjid_count: 29,
        description: "Southwark, Lambeth, Croydon, Merton, Tooting"
      }
    ]
  },
  {
    id: "birmingham",
    name: "Birmingham", 
    country: "England",
    image_url: "/images/cities/birmingham.jpg",
    latitude: 52.4862,
    longitude: -1.8904,
    areas: [
      {
        id: "birmingham-central",
        name: "Birmingham Central",
        city_id: "birmingham",
        latitude: 52.4862,
        longitude: -1.8904,
        radius_km: 2,
        masjid_count: 20,
        description: "City Centre, Jewellery Quarter, Digbeth"
      },
      {
        id: "small-heath",
        name: "Small Heath & Bordesley",
        city_id: "birmingham",
        latitude: 52.4675,
        longitude: -1.8567,
        radius_km: 2,
        masjid_count: 60,
        description: "Small Heath, Bordesley Green, Alum Rock"
      },
      {
        id: "sparkhill",
        name: "Sparkhill & Sparkbrook",
        city_id: "birmingham",
        latitude: 52.4542,
        longitude: -1.8567,
        radius_km: 2,
        masjid_count: 50,
        description: "Sparkhill, Sparkbrook, Balsall Heath"
      },
      {
        id: "aston",
        name: "Aston & Nechells",
        city_id: "birmingham",
        latitude: 52.5067,
        longitude: -1.8567,
        radius_km: 2,
        masjid_count: 14,
        description: "Aston, Nechells, Lozells"
      },
      {
        id: "handsworth",
        name: "Handsworth",
        city_id: "birmingham",
        latitude: 52.5167,
        longitude: -1.9267,
        radius_km: 2,
        masjid_count: 21,
        description: "Handsworth, Handsworth Wood"
      }
    ]
  },
  {
    id: "manchester",
    name: "Manchester",
    country: "England", 
    image_url: "/images/cities/manchester.jpg",
    latitude: 53.4808,
    longitude: -2.2426,
    areas: [
      {
        id: "manchester-central",
        name: "Manchester City Centre",
        city_id: "manchester",
        latitude: 53.4808,
        longitude: -2.2426,
        radius_km: 2,
        masjid_count: 13,
        description: "City Centre, Northern Quarter, Ancoats"
      },
      {
        id: "longsight",
        name: "Longsight & Levenshulme",
        city_id: "manchester",
        latitude: 53.4467,
        longitude: -2.1967,
        radius_km: 2,
        masjid_count: 18,
        description: "Longsight, Levenshulme, Gorton"
      },
      {
        id: "cheetham-hill",
        name: "Cheetham Hill",
        city_id: "manchester",
        latitude: 53.5067,
        longitude: -2.2367,
        radius_km: 2,
        masjid_count: 11,
        description: "Cheetham Hill, Crumpsall"
      },
      {
        id: "rusholme",
        name: "Rusholme & Fallowfield",
        city_id: "manchester",
        latitude: 53.4467,
        longitude: -2.2267,
        radius_km: 2,
        masjid_count: 17,
        description: "Rusholme, Fallowfield, Moss Side"
      },
      {
        id: "oldham-road",
        name: "Oldham Road Area",
        city_id: "manchester",
        latitude: 53.4967,
        longitude: -2.1867,
        radius_km: 3,
        masjid_count: 3,
        description: "Oldham Road, Collyhurst, Miles Platting"
      }
    ]
  },
  {
    id: "bradford",
    name: "Bradford",
    country: "England",
    image_url: "/images/cities/bradford.jpg", 
    latitude: 53.7960,
    longitude: -1.7594,
    areas: [
      {
        id: "bradford-central",
        name: "Bradford City Centre",
        city_id: "bradford",
        latitude: 53.7960,
        longitude: -1.7594,
        radius_km: 2,
        masjid_count: 54,
        description: "City Centre, Little Germany"
      },
      {
        id: "manningham",
        name: "Manningham",
        city_id: "bradford",
        latitude: 53.8067,
        longitude: -1.7694,
        radius_km: 2,
        masjid_count: 44,
        description: "Manningham, Oak Lane"
      },
      {
        id: "girlington",
        name: "Girlington & Barkerend",
        city_id: "bradford",
        latitude: 53.7867,
        longitude: -1.7394,
        radius_km: 2,
        masjid_count: 32,
        description: "Girlington, Barkerend, Laisterdyke"
      },
      {
        id: "keighley",
        name: "Keighley",
        city_id: "bradford",
        latitude: 53.8671,
        longitude: -1.9069,
        radius_km: 3,
        masjid_count: 8,
        description: "Keighley town and surrounding areas"
      }
    ]
  },
  {
    id: "leicester",
    name: "Leicester",
    country: "England",
    image_url: "/images/cities/leicester.jpg",
    latitude: 52.6369,
    longitude: -1.1398,
    areas: [
      {
        id: "leicester-central",
        name: "Leicester City Centre",
        city_id: "leicester",
        latitude: 52.6369,
        longitude: -1.1398,
        radius_km: 2,
        masjid_count: 29,
        description: "City Centre, Cultural Quarter"
      },
      {
        id: "highfields",
        name: "Highfields & Spinney Hills",
        city_id: "leicester",
        latitude: 52.6169,
        longitude: -1.1198,
        radius_km: 2,
        masjid_count: 28,
        description: "Highfields, Spinney Hills, Stoneygate"
      },
      {
        id: "belgrave",
        name: "Belgrave & Rushey Mead",
        city_id: "leicester",
        latitude: 52.6569,
        longitude: -1.1298,
        radius_km: 2,
        masjid_count: 10,
        description: "Belgrave, Rushey Mead, Northfields"
      }
    ]
  },
  {
    id: "cardiff",
    name: "Cardiff",
    country: "Wales",
    image_url: "/images/cities/cardiff.jpg",
    latitude: 51.4816,
    longitude: -3.1791,
    areas: [
      {
        id: "cardiff-central",
        name: "Cardiff City Centre",
        city_id: "cardiff",
        latitude: 51.4816,
        longitude: -3.1791,
        radius_km: 2,
        masjid_count: 20,
        description: "City Centre, Cardiff Bay, Cathays"
      },
      {
        id: "riverside",
        name: "Riverside & Canton",
        city_id: "cardiff",
        latitude: 51.4716,
        longitude: -3.2091,
        radius_km: 2,
        masjid_count: 7,
        description: "Riverside, Canton, Grangetown"
      },
      {
        id: "roath",
        name: "Roath & Plasnewydd",
        city_id: "cardiff",
        latitude: 51.4916,
        longitude: -3.1591,
        radius_km: 2,
        masjid_count: 9,
        description: "Roath, Plasnewydd, Adamsdown"
      }
    ]
  },
  {
    id: "swansea",
    name: "Swansea",
    country: "Wales",
    image_url: "/images/cities/swansea.jpg",
    latitude: 51.6214,
    longitude: -3.9436,
    areas: [
      {
        id: "swansea-central",
        name: "Swansea City Centre",
        city_id: "swansea",
        latitude: 51.6214,
        longitude: -3.9436,
        radius_km: 2,
        masjid_count: 2,
        description: "City Centre, Marina, SA1"
      },
      {
        id: "st-thomas",
        name: "St Thomas & Port Tennant",
        city_id: "swansea",
        latitude: 51.6114,
        longitude: -3.9636,
        radius_km: 2,
        masjid_count: 3,
        description: "St Thomas, Port Tennant, Hafod"
      }
    ]
  },
  {
    id: "newport",
    name: "Newport",
    country: "Wales",
    image_url: "/images/cities/newport.jpg",
    latitude: 51.5842,
    longitude: -2.9977,
    areas: [
      {
        id: "newport-central",
        name: "Newport City Centre",
        city_id: "newport",
        latitude: 51.5842,
        longitude: -2.9977,
        radius_km: 2,
        masjid_count: 9,
        description: "City Centre, Pill, Docks"
      },
      {
        id: "pillgwenlly",
        name: "Pillgwenlly & Lliswerry",
        city_id: "newport",
        latitude: 51.5742,
        longitude: -2.9777,
        radius_km: 2,
        masjid_count: 9,
        description: "Pillgwenlly, Lliswerry, Victoria"
      }
    ]
  },
  {
    id: "glasgow",
    name: "Glasgow",
    country: "Scotland",
    image_url: "/images/cities/glasgow.jpg",
    latitude: 55.8642,
    longitude: -4.2518,
    areas: [
      {
        id: "glasgow-central",
        name: "Glasgow City Centre",
        city_id: "glasgow",
        latitude: 55.8642,
        longitude: -4.2518,
        radius_km: 2,
        masjid_count: 10,
        description: "City Centre, Merchant City, Calton"
      },
      {
        id: "southside",
        name: "Southside Glasgow",
        city_id: "glasgow",
        latitude: 55.8342,
        longitude: -4.2518,
        radius_km: 3,
        masjid_count: 15,
        description: "Gorbals, Pollokshields, Strathbungo"
      },
      {
        id: "east-end",
        name: "East End Glasgow",
        city_id: "glasgow",
        latitude: 55.8542,
        longitude: -4.2118,
        radius_km: 3,
        masjid_count: 3,
        description: "Dennistoun, Bridgeton, Parkhead"
      }
    ]
  },
  {
    id: "edinburgh",
    name: "Edinburgh",
    country: "Scotland",
    image_url: "/images/cities/edinburgh.jpg",
    latitude: 55.9533,
    longitude: -3.1883,
    areas: [
      {
        id: "edinburgh-central",
        name: "Edinburgh City Centre",
        city_id: "edinburgh",
        latitude: 55.9533,
        longitude: -3.1883,
        radius_km: 2,
        masjid_count: 8,
        description: "Old Town, New Town, Grassmarket"
      },
      {
        id: "leith",
        name: "Leith & Pilrig",
        city_id: "edinburgh",
        latitude: 55.9733,
        longitude: -3.1683,
        radius_km: 2,
        masjid_count: 4,
        description: "Leith, Pilrig, Easter Road"
      },
      {
        id: "southside-edinburgh",
        name: "Southside Edinburgh",
        city_id: "edinburgh",
        latitude: 55.9333,
        longitude: -3.1883,
        radius_km: 3,
        masjid_count: 11,
        description: "Newington, Marchmont, Bruntsfield"
      }
    ]
  },
  {
    id: "dundee",
    name: "Dundee",
    country: "Scotland",
    image_url: "/images/cities/dundee.jpg",
    latitude: 56.4620,
    longitude: -2.9707,
    areas: [
      {
        id: "dundee-central",
        name: "Dundee City Centre",
        city_id: "dundee",
        latitude: 56.4620,
        longitude: -2.9707,
        radius_km: 2,
        masjid_count: 5,
        description: "City Centre, Waterfront, West End"
      },
      {
        id: "hilltown",
        name: "Hilltown & Stobswell",
        city_id: "dundee",
        latitude: 56.4720,
        longitude: -2.9607,
        radius_km: 2,
        masjid_count: 4,
        description: "Hilltown, Stobswell, Lochee"
      }
    ]
  }
]

// Helper functions
export function getCityById(id: string): City | undefined {
  return cities.find(city => city.id === id)
}

export function getAreaById(cityId: string, areaId: string): Area | undefined {
  const city = getCityById(cityId)
  return city?.areas.find(area => area.id === areaId)
}

export function formatCitySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function formatAreaSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function getAllAreaIds(): string[] {
  return cities.flatMap(city => city.areas.map(area => area.id))
}

export function getAllCityIds(): string[] {
  return cities.map(city => city.id)
}
