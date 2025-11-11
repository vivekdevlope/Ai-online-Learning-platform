"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetailContext } from "../context/UserDetailContext.js";
import { SelectedChapterIndexContext } from "../context/SelectedChapterIndexContent.js";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail,setUserDetail] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  useEffect(() => {
    if (user && !userDetail) {
      CreateNewUser();
    }
  }, [user, userDetail]);
  

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      setUserDetail(result.data)
      console.log(result.data);
    } catch (error) {
      console.error("Error creating user:", error);

    }
  };

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
      <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
