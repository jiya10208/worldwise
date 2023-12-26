# worldwise
1. Homepage and Navbar:
Description: The application starts with a homepage featuring a navigation bar created using react-router-dom. The navbar allows users to access different pages within the application.

2. Login Page:
Description: The login page utilizes fake authorization using the powerful combination of useContext and useReducer. The fakeAuthContext handles two crucial actions: logging into the page and logging out.

3. User Authentication:
Description: Upon successful login, your name and a randomly generated picture are displayed in the top right corner. The authentication state is managed by a custom hook named useAuth. This hook provides values such as isAuthenticated, user, login, and logout. If you wish to log out, the application allows you to do so seamlessly.

4. Map Container:
Description: The application integrates an interactive map using react-leaflet. Additionally, a custom GeoLocation hook enables live navigation based on your location. The map component includes a sidebar with various functionalities.

5. Sidebar:
Description: The sidebar is a critical component that displays the names of cities and provides an option to search for countries. You can add and remove city names, and the date of addition is displayed. The application uses a fake API to persistently store data locally. The sidebar also relies on a custom context (CitiesContext) and employs useCallBack for optimization.


6. Custom Hooks:
Description: Several custom hooks enhance the application's functionality.
useNavigate: Facilitates navigation to different pages.
useAuth: Manages user authentication with features like login and logout.
useEffect: Ensures page reloads only when specific dependencies change.
useContext: Creates and utilizes various contexts.
useReducer: Consolidates and manages state logic.
useParams: Extracts data from the URL.
UseCities: Custom hook for working with the context.
UseSearchParams: Extracts lat and lng from the URL.

7. Optimizations:
Description: The application employs lazy loading using Suspense for an optimized initial rendering. This enhances your experience by loading only the necessary components when required.


8. Protect Route Component:
Description: To prevent unwanted behavior, the application includes a ProtectRoute component. If you try to reload the page while already logged in, this component redirects you to the initial page or homepage.


10. Additional Features:
Description: The application boasts additional features such as a custom GeoLocation hook for live navigation and a user location pointer on the map. You can manage the map by moving around and using the mouse. A dedicated button allows you to easily use your current location.


