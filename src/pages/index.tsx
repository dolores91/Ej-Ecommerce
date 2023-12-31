import { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import { Card } from "@/components/ui/card";
import { ProductsAPIResponse } from "@/types";
import { useRouter } from "next/router";
import { TEXTS_BY_LANGUAGE, defaultLocale } from "@/locale/constants";
import { Layout } from "@/components/layouts";
interface Props {
	data: ProductsAPIResponse;
}

const Home: NextPage<Props> = ({ data }) => {
	// Traduciones borradas para el ejercicio
	const { locale } = useRouter();

	if (!data) return <h1>loading...</h1>;

	const { MAIN } =
		TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
		TEXTS_BY_LANGUAGE[defaultLocale];
	// Traduciones borradas para el ejercicio

	return (
		<Layout>
			<main className={styles.main}>
				<h1>Tienda - {MAIN.PRODUCTS}</h1>
				<div className={styles.grid}>
					{/* Borrar para el ejercicio */}
					{data &&
						data.map((product: any) => (
							<Card key={product.id} product={product} />
						))}
				</div>
			</main>
		</Layout>
	);
};

// Traer los datos de la API con getServerSideProps o getStaticProps
export const getServerSideProps = async ({ locale }: { locale: string }) => {
	// const baseUrl = process.env.BASE_URL;
	const baseUrl = "https://ej-ecommerce.vercel.app/"; // Cambiar por la url del proyecto una vez deployada la API

	const response = await fetch(`${baseUrl}api/products/${locale}`);

	const data = await response.json();

	return {
		props: {
			data,
		},
	};
};

export default Home;
