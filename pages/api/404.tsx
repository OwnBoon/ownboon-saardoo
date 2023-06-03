import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div>
     a error  reccorderd
     <button onClick={() => router.push("/dashboard")}>home page</button>
    </div>
  );
}
