import Admin from "../components/Admin/Admin";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <>Loading</>;

  return <Admin />;
}

export default AdminPage;
