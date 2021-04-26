import { useState } from 'react';
import axios from "axios";

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
      };
      const [token, setToken] = useState(getToken());

      const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
        //console.log(userToken);
      };

      return {
        setToken: saveToken,
        token
      }

}
