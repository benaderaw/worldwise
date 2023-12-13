import AppNav from "../components/Appnav";
import PageNav from "../components/PageNav";

export default function AppLayout() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>App</h1>
    </div>
  );
}
