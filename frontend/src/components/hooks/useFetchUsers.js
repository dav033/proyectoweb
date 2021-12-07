import { useEffect, useState } from "react";
import axios from "axios";

async function FetchUsers(id) {
  function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  const response = await axios.get("/api/users");
  const users = await response.data;

  for (let i in response.data) {
    if (response.data[i]._id === id) {
      removeItemFromArr(response.data, response.data[i]);
    }
  }
  console.log(users);
  return users;
}

export default FetchUsers;
