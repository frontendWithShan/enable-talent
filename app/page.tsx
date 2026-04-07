
import HomePage from "@/components/HomePage/HomePage";
import ScrollToTop from "@/components/shared/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <main 
        id="main-content" 
        tabIndex={-1} 
        className="w-full max-w-[1920px] mx-auto overflow-hidden"
        suppressHydrationWarning
      >
        <HomePage />
      </main>
    </>
  );
}
