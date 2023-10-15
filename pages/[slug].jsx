import Navbar from "../components/Navbar";
import Footer from "../components/Home/Footer";
import ParentHabit from "../components/Habits/ParentHabit";

export default function Page({ section }) {
  let content;

  if (section === "habits") {
    content = <ParentHabit section={"habit"} />;
  } else if (section === "community") {
    content = <ParentHabit section={"community"} />;
  } else if (section === "productivity") {
    content = <ParentHabit section={"productivity"} />;
  } else {
    content = "";
  }

  return (
    <>
      <Navbar />
      <div className="my-auto mx-auto">{content}</div>
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  return {
    props: {
      section: slug,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "habits" } },
      { params: { slug: "community" } },
      { params: { slug: "productivity" } },
    ],
    fallback: false,
  };
}
