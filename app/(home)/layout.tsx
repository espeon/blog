import ProfileCard from "@/components/profileCard";

export default function Page({ children }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-8 items-left justify-center gap-4 mt-4">
      <ProfileCard />
      {children}
    </div>
  );
}
