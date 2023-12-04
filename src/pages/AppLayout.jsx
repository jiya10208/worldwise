import Sidebar from "../components/Sidebar";
import User from "../components/User";
import Map from "../components/map";
import styles from "./AppLayout.module.css";
import ProtectedRoute from "./ProtectedRoute";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar /> <Map /> <User />
    </div>
  );
}
