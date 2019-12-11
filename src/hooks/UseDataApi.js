import { useEffect, useState } from "react";
import axios from "axios";

const useDataApi = url => {
  const [dataState, setDataState] = useState({ data: [], isFetching: false });
  const [endpointUrl] = useState(url);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setDataState({ ...dataState, isFetching: true });
        const response = await axios.get(endpointUrl);
        setDataState({
          ...dataState,
          data: response.data,
          isFetching: false
        });
      } catch (e) {
        console.log(e);
        setDataState({ ...dataState, isFetching: false });
      }
    };
    fetchDataFromApi();
  }, []); // Runs once

  return [dataState];
};

export default useDataApi;
