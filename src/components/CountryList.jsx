import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/citiesContext";
export default function CountryList() {
  const { countries, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!countries.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const currentcountry = countries.reduce((arr, country) => {
    if (!arr.some((el) => el.country === country.country)) {
      return [...arr, { country: country.country, emoji: country.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {currentcountry.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
