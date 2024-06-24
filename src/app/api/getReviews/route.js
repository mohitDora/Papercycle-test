// src/app/api/getReviews/route.js

import { GOOGLE_API_KEY, PLACE_ID } from "@/Constant";

export async function GET(req, res) {
    // const { searchParams } = new URL(req.url);
    // const placeId = searchParams.get('placeId');
  
    // if (!placeId) {
    //   return res.status(400).json({ error: 'Place ID is required' });
    // }
  
    const apiKey = GOOGLE_API_KEY; // Store your API key in an environment variable
    const placeId = PLACE_ID; // Store your API key in an environment variable
  
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
  
      if (!response.ok) {
        throw new Error('Error fetching place details');
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error('Error fetching place details:', error);
      return new Response(JSON.stringify({ error: 'Error fetching place details' }), { status: 500 });
    }
  }
  