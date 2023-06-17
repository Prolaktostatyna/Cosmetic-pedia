import { useEffect, FunctionComponent } from "react";
import axios from "axios";

type FetchDataComponentProps = {
  brand: string;
  prodType: string;
  onDataFetch: any;
};

export const FetchDataComponent: FunctionComponent<FetchDataComponentProps> = ({
  brand,
  prodType,
  onDataFetch,
}) => {
  useEffect(() => {
    const mainApiUrl =
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=";

    const fetchData = async () => {
      let url;

      if (prodType === "all") {
        url = `${mainApiUrl}${brand}`;
      } else {
        url = `${mainApiUrl}${brand}&product_type=${prodType}`;
      }

      try {
        const response = await axios.get(url);
        const data = response.data;
        onDataFetch(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    fetchData();
  }, [brand, prodType, onDataFetch]);

  return null;
};
