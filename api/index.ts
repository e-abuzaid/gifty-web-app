import {
  Person,
  Event,
  SigninForm,
  SignupForm,
  ProductType,
} from "@/types/types";
import { calculateAge } from "@/utils";

const baseUrl = "https://gifty-5tpp.onrender.com";
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dhhudmiry/upload";
const amazonUrl =
  "https://amazon-web-scraping-api.p.rapidapi.com/products/search";
const rapidApiKey = process.env.RAPID_API_KEY;
const uploadPreset = process.env.UPLOAD_PRESET;

export const uploadImage = async (image: string | ArrayBuffer | null) => {
  //   let base64Img = `data:image/jpg;base64,${image}`;
  let data = {
    file: image,
    upload_preset: uploadPreset,
  };
  const response = await fetch(cloudinaryUrl, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });
  const result = await response.json();
  console.log(result);
  return result.secure_url;
};

export const signup = async (formData: SignupForm) => {
  const response = await fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const signin = async (formData: SigninForm) => {
  const response = await fetch(`${baseUrl}/user/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result;
  }
};

export const createPerson = async (person: Person) => {
  const response = await fetch(`${baseUrl}/person/`, {
    method: "POST",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const getPeople = async (id: string) => {
  const response = await fetch(`${baseUrl}/person/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
};

export const updatePerson = async (person: Person, id: string) => {
  const response = await fetch(`${baseUrl}/person/${id}`, {
    method: "PUT",
    body: JSON.stringify(person),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const getPerson = async (id: string, userId: string) => {
  const response = await fetch(`${baseUrl}/person/${userId}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};
export const getEvents = async (id: string) => {
  const response = await fetch(`${baseUrl}/event/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
};

export const getEvent = async (id: string, userId: string) => {
  console.log(userId);
  console.log(id);
  const response = await fetch(`${baseUrl}/event/${userId}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const createEvent = async (event: Event) => {
  const response = await fetch(`${baseUrl}/event/`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const updateEvent = async (event: Event, id: string) => {
  const response = await fetch(`${baseUrl}/event/${id}`, {
    method: "PUT",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const generateQueries = async (event: Event, person: Person) => {
  const age = calculateAge(person);
  const prompt = `only the titles for a ${event.name} gift
      that is a product and can be purchased online
      for my ${age}-year-old ${person.relationship}
      who is a ${person.gender} ${person.occupation}
      and is interested in
      ${
        person?.interests?.length === 1
          ? person.interests[0]
          : person?.interests?.length! > 1
          ? person?.interests?.join(",")
          : ""
      }`;
  const response = await fetch(`${baseUrl}/openai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const getProducts = async (query: string) => {
  const response = await fetch(
    `${amazonUrl}?criteria=${query}&page=1&countryCode=EG&languageCode=EN`,
    {
      method: "GET",
      //@ts-ignore
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "amazon-web-scraping-api.p.rapidapi.com",
      },
    }
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const fetchProducts = async (id: string) => {
  const response = await fetch(`${baseUrl}/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
};

export const createProduct = async (product: ProductType) => {
  console.log(product);
  const response = await fetch(`${baseUrl}/product/`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${baseUrl}/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};
