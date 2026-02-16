import { Routes, Route } from "react-router";
import Page from "../app/page";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
    </Routes>
  );
}
