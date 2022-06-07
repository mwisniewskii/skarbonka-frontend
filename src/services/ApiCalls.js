export const BaseUrl = 'https://api.mwis.pl/'


export const AuthUser = async () => {
  return await fetch("".concat(`${BaseUrl}`, 'auth/user'), {
     headers: {
       "Content-Type": "application/json",
     },
     credentials: "include",
   });
}

export const UserInfo = async () => {
   const response = await fetch("".concat(`${BaseUrl}`, 'auth/user'),  {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
   })
   return await response.json();
}

export const FamilyUsers = async () => {
   const response = await fetch("".concat(`${BaseUrl}`, "users/"), {
     headers: {
       "Content-Type": "application/json",
     },
     credentials: "include",
   });
   return await response.json();
};
