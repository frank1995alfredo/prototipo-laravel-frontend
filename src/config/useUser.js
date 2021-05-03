import { useState } from 'react';

export default function useUser() {
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const userUser = JSON.parse(userString);
        return userUser
      };
      const [user, setUser] = useState(getUser());

      const saveUser = userUser => {
        localStorage.setItem('user', JSON.stringify(userUser));
        setUser(userUser);
        //console.log(userToken);
      };

      return {
        setUser: saveUser,
        user
      }

}
