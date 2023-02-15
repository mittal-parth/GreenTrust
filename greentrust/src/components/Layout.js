import Navbar from "./Navbar";
import classes from "../style";

export default function Layout({ children }) {
  return (
    <div className="bg-white w-full overflow-auto h-screen">
      <Navbar />

      <main>
        <div className={`${classes.paddingX} ${classes.flexCenter} mt-8`}>
          <div className={`${classes.boxWidth}`}>{children}</div>
        </div>
      </main>
    </div>
  );
}
