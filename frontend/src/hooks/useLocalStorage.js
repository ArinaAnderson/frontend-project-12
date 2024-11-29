import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const [storageData, setStorageData] = useState(() => {
    const savedVal = localStorage.getItem(key);
    if (savedVal !== null) {
      return { value: JSON.parse(savedVal), type: null };  // {auth: { token, username }, type: null }
    }
    return { value: null, type: null }; // {auth: null, type: null}
  });
  console.log('STORAGEDATA', storageData);
  useEffect(() => {
  console.log('STORAGEDATA', storageData);
    switch (storageData.type) {
      case null:
      break;
      case 'setValue':
        localStorage.setItem(key, JSON.stringify(storageData.value));
        break;
      case 'removeValue':
        console.log('REMOVE VAL');
        localStorage.removeItem(key);
      default:
        throw new Error(`Unknown localStorage action type: '${storageData.type}'!`);
    }
  }, [storageData, setStorageData]);

  return [storageData, setStorageData];
};
/*
const useLocalStorage = ({ key }) => {
  const [storageData, setStorageData] = useState(() => {
    const savedVal = localStorage.getItem(key);
    if (savedVal !== null) {
      return { value: JSON.parse(savedVal), type: null };  // {auth: { token, username }, type: null }
    }
    return { value: null, type: null }; // {auth: null, type: null}
  });
  console.log('STORAGEDATA', storageData);
  useEffect(() => {
    console.log('STORAGEDATA', storageData);
    switch (storageData.type) {
      case null:
        break;
      case 'setValue':
        localStorage.setItem(key, JSON.stringify(storageData.value));
        break;
      case 'removeValue':
        console.log('REMOVE VAL');
        localStorage.removeItem(key);
      default:
        throw new Error(`Unknown localStorage action type: '${storageData.type}'!`);
    }
  }, [storageData, setStorageData]);

  return [storageData, setStorageData];
};
*/

export default useLocalStorage;
