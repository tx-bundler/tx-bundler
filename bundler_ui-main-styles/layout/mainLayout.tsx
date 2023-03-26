import Navbar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

export default function MainLayout({ children }: any) {
	return (
		<div>
            <Navbar />
            {children}
			<Footer />
		</div>
	);
}
