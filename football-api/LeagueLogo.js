import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "react-native";

const API_KEY = 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508'; // Your RapidAPI Key
import React from 'react'

export default function LeagueLogo() {
    const getLeagueLogo = async () => {
        const options = {
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
          params: {
           id:'39' // Premier League ID
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        };
      
        try {
          const response = await axios.request(options);
      
          // Check if response contains data
          if (response.data && response.data.response && response.data.response[0] && response.data.response[0].league) {
            return response.data.response[0].league.logo;
          } else {
            console.error('League data not found in API response');
            return '';
          }
        } catch (error) {
          console.error('Error fetching League Logo:', error);
          return '';
        }
      };
      
      const ExampleComponent = () => {
        const [leagueLogo, setLeagueLogo] = useState('');
      
        useEffect(() => {
          const fetchLeagueLogo = async () => {
            const logo = await getLeagueLogo();
            setLeagueLogo(logo);
          };
      
          fetchLeagueLogo();
        }, []);
      
        return (
          <Image source={{uri: leagueLogo}}></Image>
        );
}
}
